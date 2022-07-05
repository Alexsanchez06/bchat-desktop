import React from 'react';
import { SessionButton, SessionButtonColor, SessionButtonType } from '../basic/SessionButton';


export const DisplayIdAndAddress= (props:any) => (
    <div className={"session-id-And-Address-container"}
     style={{
      width: "50%",
        margin: '0 auto',
        textAlign:"center"
      }}  >
      <h1 className={"session-head"} 
        style={{
        color:"white"
        }}>{window.i18n('welcome')}</h1>
      <div className='id-And-Address-Sub-container'
       style={{
        padding:'20PX',
        backgroundColor:"#282833"
        ,borderRadius: "10px"
        ,margin: "10px 0 37px",
        height:'375px'
        }}>
        <h6 style={{
          color: "white",
          fontSize: '18px',
          margin: 0,
          padding: "10px 0 6px 0px",
          fontFamily:'poppin-semibold'
          }}>{window.i18n('chatId')}</h6>
        <div style={{backgroundColor:"#353543",
          width: "100%",
          height: '60px',
          borderRadius: "13px",
          display: "flex",
          alignItems: "center",
          color: "#0BB70F"}}>
              
          <p style={{
            display: 'flex',
            justifyItems: "center"
            ,padding: "0 20px",
            fontSize:'12px',
            fontFamily:"poppin-medium"
            }}>{props.pubKey}</p>
        </div>
        <p style={{width: "75%",
            display: "flex",
            fontSize: "10px",
            color: "#82828D",
            margin: '10px auto'
            }}>{window.i18n('yourBchatName')}</p>
        <h6 style={{
          color: "white",
          fontSize: '18px',
          margin: 0,
          padding: "20px 0 10px 0px",
          fontFamily:"poppin-semibold"
          }}>{window.i18n('beldexAddress')}</h6>
        <div style={{
          backgroundColor:"#353543",
          width: "100%",
          padding:"0px 20px",
          borderRadius: "13px",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          fontSize: "12px",
          color: "#1782FF",
          fontFamily:"poppin-medium"
          }}>
        
            <p>{props.walletAddress}</p>
        </div>
        <p style={{width: "75%",
           display: "flex",
          //  textAlign: "center",
           fontSize: "10px",
           color: "#82828D",
           margin: '10px auto'}}>
            {window.i18n('beldexAddressConnection')}</p>
      </div>
      <SessionButton
        onClick={props.nextFunc}
        buttonType={SessionButtonType.Brand}
        buttonColor={SessionButtonColor.Green}
        text="Next"
      />
      </div>

);

export const ShowRecoveryPhase= (props:any) => (
      <div className={"session-id-And-Address-container"}
        style={{
        width: "50%",
        margin: '0 auto',
        textAlign:"center"
      }}  >
      <h1 
      className={"session-head"} 
        style={{
        color:"white"
        }}>{window.i18n('recoveryPhrase')}</h1>
        <h5 style={{color:"white",fontFamily:"poppin-regular"}}><span style={{color:"#F23333"}}>Note :</span> {window.i18n('saveYourRecoveryPhrase')}
        <br/><span style={{fontFamily:"poppin-semibold"}}>{window.i18n('copyToContinueRecovery')}</span></h5>
      <div className='id-And-Address-Sub-container'
       style={{
        padding:"5px 20px",
        backgroundColor:"#353543"
        ,borderRadius: "12px"
        ,margin: "10px 0 25px",
        display: "flex",
        width: "100%",
        justifyContent: "center",
        fontSize: "12px",
        color: "#0BB70F",
        alignItems: "center"
        }}>
        <div style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          fontSize: "12px",
          color: "#0BB70F",
          fontFamily:"poppin-medium"
          }}>
            <p>{props.mnemonic}</p>
        </div>
      </div>
      <SessionButton
        onClick={props.nextFunc}
        buttonType={SessionButtonType.Brand}
        buttonColor={SessionButtonColor.Green}
        text={window.i18n('continue')}
        disabled={!props.enableCompleteSignUp}
      />
      </div>
);