import { UnifiedWalletButton, useUnifiedWallet } from "@jup-ag/wallet-adapter"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button";

export default function ConnectWallet(){
    
    const {connected, disconnect, publicKey} = useUnifiedWallet();
    const formateAddress = (address:string):string=>{
        return `${address.slice(0,4)}...${address.slice(address.length- 4,address.length)}`
    }
    if(connected && publicKey){
        return(
            <>
<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant='outline'>
            {formateAddress(publicKey.toBase58())}
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Connected</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={()=>disconnect()}>Disconnect</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
            </>
        )
    }
    return(
        <>
        <UnifiedWalletButton buttonClassName="h-9 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"/>
        </>
    )
}