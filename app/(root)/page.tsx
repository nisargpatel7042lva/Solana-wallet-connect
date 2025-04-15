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

        await toast.success('Transaction Successful!!', {
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

  const onReset = () => {
    form.reset();
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
              <FormField
                control={form.control}
                name="receiver"
                render={() => (
                    <FormItem>
                    <FormLabel className="text-md font-medium text-gray-700">
                      Receiver
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Receiver's Public Key"
                        className="text-sm"
                        onChange={(e) => setPublic_Key(e.target.value)}
                        />
                    </FormControl>
                  </FormItem>
                )}
                />

              <FormField
                control={form.control}
                name="amount"
                render={() => (
                    <FormItem>
                    <FormLabel className="text-md font-medium text-gray-700">
                      Amount (SOL)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter amount in SOL"
                        type="number"
                        className="text-sm"
                        onChange={(e) => setAmtSol(Number(e.target.value))}
                        />
                    </FormControl>
                  </FormItem>
                )}
                />

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
                  onClick={onReset}
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
