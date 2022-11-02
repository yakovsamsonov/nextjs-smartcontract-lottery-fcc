import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <div>
            Decentalized Lottery
            <ConnectButton moralisAuth={false} />
        </div>
    )
}
