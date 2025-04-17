# 🚀 Solana Wallet Transfer DApp

This is a React-based decentralized application (dApp) that allows users to transfer SOL on the **Solana Devnet**. It features:

- Wallet connection via `@jup-ag/wallet-adapter`
- Form-based user input for receiver address and amount
- Transaction submission and confirmation
- Toast notifications on successful transfer

---

## 🌐 Live Demo

Click [Here](https://solana-wallet-connect-five.vercel.app/)

---


## 📦 Tech Stack

- **React** + **Next.js / Vite**
- **Tailwind CSS** + **Shadcn UI**
- **Solana Web3.js**
- **Jupiter Wallet Adapter**
- **React Hook Form**
- **React Toastify**

---

## 🚀 Features

- 🔒 Connect Solana Wallet
- 💸 Send SOL to any valid address
- 🧲 Uses Devnet (no real SOL required)
- ✅ Toast success confirmation
- ❌ Reset form option

---

## 🛠️ Installation

```bash
# Clone the repo
git clone https://github.com/nisargpatel7042lva/Solana-wallet-connect.git
cd Solana-wallet-connect

# Install dependencies
npm install
OR
bun i

# Run the dev server
npm run dev
OR
bun dev
```

---

## 🧠 Usage

1. Connect your Solana wallet using the "Connect Wallet" button.
2. Enter the **Receiver's Public Key** and **Amount in SOL**.
3. Click `Add` to initiate the transfer.
4. Upon successful confirmation, a toast will display a success message.
5. Use `Reset` to clear the form fields.

---

## 📁 File Structure

```
src/
│
├── components/
│   └── wallet.tsx           # Wallet connect UI
│
├── pages/
│   └── Homepage.tsx         # Main dApp logic and UI
│
├── styles/
│   └── globals.css          # Tailwind + custom styles
│
└── App.tsx / main.tsx       # App entry point
```

---



## 💡 Notes

- This dApp uses the Solana **Devnet**, which is a safe environment for testing.
- Use Solana Devnet faucet to request free SOL:
  https://solfaucet.com/

---

## 🤝 Contributing

Feel free to fork this repo and submit pull requests.

---

## 📃 License

MIT License © 2025 [Nisarg Patel]

