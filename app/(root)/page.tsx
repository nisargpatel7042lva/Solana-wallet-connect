"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { useState } from "react";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useUnifiedWallet } from "@jup-ag/wallet-adapter";
import ConnectWallet from "@/components/wallet";
import { toast, ToastContainer } from "react-toastify";

export default function Homepage() {
  const [public_key, setPublic_Key] = useState("");
  const [amtSol, setAmtSol] = useState<number>(0);
  const { connected, publicKey, sendTransaction } = useUnifiedWallet();

  const form = useForm({
    defaultValues: {
      receiver: "",
      amount: "",
    },
  });

  const onSubmit = async () => {
    if (!publicKey) throw new Error("Wallet not connected");
    console.log("Clicked");

    const connection = new Connection(clusterApiUrl("devnet"));
    const pk = new PublicKey(public_key);
    const lamports = amtSol * LAMPORTS_PER_SOL;
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: pk,
        lamports: lamports,
      })
    );

    const signature = await sendTransaction(transaction, connection);
    console.log(signature);

    const latestBlockhash = await connection.getLatestBlockhash();
    const confirmation = await connection.confirmTransaction({
      signature,
      blockhash: latestBlockhash.blockhash,
      lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
    });

    if (confirmation.value.err) {
      throw new Error(
        "Transaction failed to confirm: " +
          confirmation.value.err.toString()
      );
    }
    if(confirmation){

        toast.success('Transaction Successful!!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }
    console.log("Transaction confirmed:", confirmation);
    return confirmation;
  };


  return (
    <>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#e0f7fa] via-[#fff] to-[#ffe0f7] px-4 py-10">
       {/* GitHub Link */}
       <a
          href="https://github.com/nisargpatel7042lva/Solana-wallet-connect.git"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 left-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="text-black hover:text-gray-700 transition-colors"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 
                     6.53 5.47 7.59.4.07.55-.17.55-.38 
                     0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94
                     -.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52
                     -.01-.53.63-.01 1.08.58 1.23.82.72 1.21 
                     1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78
                     -.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
                     -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82
                     .64-.18 1.32-.27 2-.27.68 0 1.36.09 
                     2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 
                     1.92.08 2.12.51.56.82 1.27.82 2.15 0 
                     3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 
                     1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 
                     8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
      
      <div className="mb-8">
        <ConnectWallet />
      </div>

      {!connected || !publicKey ? (
          <p className="text-lg font-semibold text-gray-600">
          Please Connect Wallet
        </p>
      ) : (
          <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
          <h1 className="text-2xl font-bold text-center mb-6 text-indigo-700">
            Send SOL on Devnet
          </h1>

          <Form {...form}>
  <form
    onSubmit={form.handleSubmit(onSubmit)}
    className="space-y-6"
  >
    {/* Receiver Public Key Field */}
    <FormField
      control={form.control}
      name="receiver"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-md font-medium text-gray-700">
            Receiver
          </FormLabel>
          <FormControl>
            <Input
              placeholder="Enter Receiver's Public Key"
              className="text-sm"
              value={field.value}
              onChange={(e) => {
                field.onChange(e);
                setPublic_Key(e.target.value); // sync with useState if needed
              }}
            />
          </FormControl>
        </FormItem>
      )}
    />

    {/* Amount Field */}
    <FormField
      control={form.control}
      name="amount"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-md font-medium text-gray-700">
            Amount (SOL)
          </FormLabel>
          <FormControl>
            <Input
              placeholder="Enter amount in SOL"
              type="number"
              className="text-sm"
              value={field.value}
              onChange={(e) => {
                const value = Number(e.target.value);
                field.onChange(value);
                setAmtSol(value); // sync with useState if needed
              }}
            />
          </FormControl>
        </FormItem>
      )}
    />

    {/* Buttons */}
    <div className="flex justify-center gap-4">
      <Button
        type="submit"
        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition"
      >
        Send
      </Button>
      <Button
        type="button"
        variant="outline"
        className="px-6 py-2 border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-50"
        onClick={() => {
          form.reset();
          setPublic_Key("");
          setAmtSol(0);
        }}
      >
        Reset
      </Button>
    </div>
  </form>
</Form>

        </div>
      )}
    </div>
      </>
  );
}
