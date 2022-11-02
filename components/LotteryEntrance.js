// 18.01.47

import { useWeb3Contract, useMoralis } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"

export default function LotteryEntrance() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const lotteryAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const [entranceFee, setEntranceFee] = useState("0")
    const [numPlayers, setNumPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")

    const dispatch = useNotification()

    const { runContractFunction: enterLottery } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "enterLottery",
        params: {},
        msgValue: entranceFee,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getRecentWinner",
        params: {},
    })

    async function updateUI() {
        const entranceFeeFromContract = (await getEntranceFee()).toString()
        const numPlayersFromContract = (await getNumberOfPlayers()).toString()
        const recentWinnerFromContract = (await getRecentWinner()).toString()
        setEntranceFee(entranceFeeFromContract)
        setNumPlayers(numPlayersFromContract)
        setRecentWinner(recentWinnerFromContract)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
        }
        updateUI()
    }, [isWeb3Enabled])

    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "TX Notification",
            position: "topR",
            icon: "bell",
        })
    }

    return (
        <div>
            Hi from Lottery Entrance!
            {lotteryAddress ? (
                <div>
                    <button
                        onClick={async function () {
                            await enterLottery({
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            })
                        }}
                    >
                        Enter Lottery
                    </button>
                    Entrance fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH Number of
                    Players: {numPlayers}
                    Recent Winner: {recentWinner}
                </div>
            ) : (
                <div>No Lottery Address found on this network</div>
            )}
        </div>
    )
}
