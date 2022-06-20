
import  ChildProcess  from "child_process";
import fs from "fs-extra";
import path from 'path';
// import portscanner from 'portscanner';
// import killport from 'kill-port';

export const  startWalletRpc = ()=> {
  console.log("uuntu:",process.platform)
    const rpcExecutable =
    process.platform === "linux"
      ? "beldex-wallet-rpc-ubuntu"
      : "beldex-wallet-rpc-darwin";
console.log("rpcExecutable:",rpcExecutable)
  // eslint-disable-next-line no-undef
  let __ryo_bin = path.join(process.cwd(), "/bin").replace(/\\/g, "\\\\");
  console.log("__ryo:",__ryo_bin);
  
  const rpcPath = path.join(__ryo_bin, rpcExecutable);
  const walletDir = `${process.cwd()}/wallet`
  console.log("walletDir:",walletDir)
  if (!fs.existsSync(walletDir)) {
    console.log("created:wallet:fileß")
    fs.mkdirpSync(walletDir)
  }
  if (!fs.existsSync(rpcPath)) {
    console.log("not exit")
      new Error(
        "Failed to find Beldex Wallet RPC. Please make sure your anti-virus has not removed it."
      )
    return;
  }
  console.log("WAIT")
//   portscanner.checkPortStatus(22026, "127.0.0.1")
//           .catch((err) =>
//            console.log("catched:",err))
//           .then(status => {
//             console.log("status:",status);

//             if (status === "closed") {
//             }});
//   console.log("STOP")   
//   console.log("walletpath:",rpcPath)       
   let wallet= ChildProcess.spawn(
    rpcPath,
    [
        '--rpc-login','test:test',
        '--rpc-bind-port','22026',
        '--daemon-address','explorer.beldex.io:19091',
        '--rpc-bind-ip','127.0.0.1',
        '--log-level', '0',
        '--wallet-dir',`${walletDir}`,
        '--log-file', `${walletDir}/wallet-rpc.log`
    ],
    { detached: true })

    wallet.stdout.on("data", data => {
        process.stdout.write(`Wallet: ${data}`);
    })
    wallet.stdout.on("error", err =>
                process.stderr.write(`Wallet: ${err}`)
    );
    wallet.stdout.on("close", (code: any) => {
        process.stderr.write(`Wallet: exited with code ${code} \n`);
                if (code === null) {
                    window?.log?.warn("Failed to start wallet RPC");
                }
    });
} 