// "use client"

// import { useForm } from "react-hook-form"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
// import { toast } from "sonner"
// import { useState } from "react"
// import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionSignature, VersionedTransaction } from "@solana/web3.js"
// import { SendTransactionOptions, useUnifiedWallet } from "@jup-ag/wallet-adapter"


// interface InputFormProps {
//     walletKey: PublicKey
//     sendTransaction: (
//         transaction: Transaction | VersionedTransaction,
//         connection: Connection,
//         options?: SendTransactionOptions
//       ) => Promise<TransactionSignature>;
    
//   }

// export function InputForm({ walletKey , sendTransaction }: InputFormProps) {
//     const [public_key,setPublic_Key] = useState('')
//     const [amtSol,setAmtSol] = useState<number>(0)

//   const form = useForm({
//   defaultValues: {
//     receiver: '',
//     amount: ''
//   }
// });


//   const onSubmit = async() => {
//     console.log("Clicked")
//     const connection = new Connection(clusterApiUrl('devnet'));
//     const publicKey = new PublicKey(public_key)
//     const lamports = amtSol * LAMPORTS_PER_SOL;
//     const transaction = new Transaction().add(
//         SystemProgram.transfer({
//             fromPubkey : walletKey,
//             toPubkey : publicKey,
//             lamports : lamports
//         }),
//     );

//     const signature = await sendTransaction(transaction,connection);
//     console.log(signature);

//     const latestBlockhash = await connection.getLatestBlockhash();
//             const confirmation = await connection.confirmTransaction({
//                 signature,
//                 blockhash: latestBlockhash.blockhash,
//                 lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
//             });

//             if (confirmation.value.err) {
//                 throw new Error("Transaction failed to confirm: " + confirmation.value.err.toString());
//             }

//             console.log("Transaction confirmed:", confirmation);

//             return confirmation

//   }

//   const onReset = () => {
//     form.reset()

//   }

//   return (
//     <Form {...form}>
//       <form className="w-2/3 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
//         <FormField
//           control={form.control}
//           name="receiver"
//           render={() => (
//             <FormItem>
//               <FormLabel>Receiver</FormLabel>
//               <FormControl>
//                 <Input placeholder="Receiver's Key" onChange={(e)=>{
//                     setPublic_Key(e.target.value);
//                 }} />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="amount"
//           render={() => (
//             <FormItem>
//               <FormLabel>Amount</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter amount in Sol" type="number" onChange={(e)=>{
//                     setAmtSol(Number(e.target.value));
//                 }}/>
//               </FormControl>
//             </FormItem>
//           )}
//         />
//         <div className="flex gap-4">
//           <Button type="submit">Add</Button>
//           <Button type="button" variant="outline" onClick={onReset}>Reset</Button>
//         </div>
//       </form>
//     </Form>
//   )
// }
