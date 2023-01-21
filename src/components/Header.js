import { useState } from "react";
import { Link } from "react-router-dom";
function Header(props){
  const [ currentTheme, setCurrentTheme ] = useState('dark');
    return (
        <header className="App-header">
          <Link className='whereindawoud' to="/home" onClick={()=>{
            props.setChosenRegion('all');
          }}>Where in the world?</Link>
        <div className='themeButton' onClick={()=>{
            
            if(currentTheme==="dark"){
              if(window.location.pathname.includes('country')){
                document.querySelector(".gobackbutton").childNodes[0].src = "/images/darkleftarrow.svg"
              }
              document.documentElement.style.setProperty('--theme-text', 'hsl(200, 15%, 8%)');
              document.documentElement.style.setProperty('--theme-contBkColor', 'hsl(0, 0%, 100%)');
              document.documentElement.style.setProperty('--theme-mainBkColor', 'hsl(0, 0%, 98%)');
              document.documentElement.style.setProperty('--theme-dropdownhover', 'hsl(0, 0%, 90%)');
              setCurrentTheme('light');
            } else {
              if(window.location.pathname.includes('country')){
                document.querySelector(".gobackbutton").childNodes[0].src = "/images/lightleftarrow.svg"
              }
              //to lay-z to move state :ppp
              document.documentElement.style.setProperty('--theme-text', 'hsl(0, 0%, 100%)');
              document.documentElement.style.setProperty('--theme-contBkColor', 'hsl(209, 23%, 22%)');
              document.documentElement.style.setProperty('--theme-mainBkColor', 'hsl(207, 26%, 17%)');
              document.documentElement.style.setProperty('--theme-dropdownhover', 'hsl(0, 0%, 40%)');
              setCurrentTheme('dark');
            }
          }}>
          <img src={`/images/${currentTheme==='dark' ? 'cmoondark':'cmoon'}.svg`} alt="" />
          <span className="dark-mode-label">{currentTheme==='dark' ? "Dark mode" : "Light mode"}</span>
        </div>
      </header>
    );
}
export default Header;