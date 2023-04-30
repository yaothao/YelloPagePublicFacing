import React from "react";
import { useNavigate } from "react-router-dom";

function DisclaimerAlert ({callback}) {
    const navigate = useNavigate();
    const handleAccept = () => {
        localStorage.setItem('hasAccepted','true');
        callback();
        navigate('/');
    }

    return (
        <div className="disclaimer-alert">
          <h1>Disclaimer 免责声明</h1>
          <p>By clicking the button below you acknowledge that you have read and agree to the following terms: </p>
          <p>点击下面的按钮表示您已经阅读并同意以下条款：</p>
          <p>

The purpose of this website is to showcase the evolution of web design in Chinese-language websites. The websites showcased on this website are from the late 1990s and early 2000s, and archived by the Internet Archive. They may contain outdated information, designs, and functionalities. The content on these websites does not reflect the views or opinions of the owners of this website. Visitors are advised to use their own discretion when browsing these websites and should not rely on the information presented as accurate or current. The owners of this website are not responsible for any harm, damage, or loss that may occur from using the content or information provided on these old websites. If you are the owner of one of the archived websites and wish to have your site removed from this website, please contact tktktk@tktktk.com</p>
<p>本网站旨在展示中文网站设计的演变过程。在本网站上展示的网站都是来自90年代后期和00年代早期，并被互联网档案馆（Internet Archive）所保存。它们可能包含过时的信息，设计，和功能。本网站所展示的网站上的内容不代表本网站拥有者的观点或意见。用户在访问这些网站时，必须谨慎对待这些网站上的信息，并且不能把这些信息当作是准确的或者最新的。本网站拥有者不为因为使用老网站上的信息所导致的任何伤害或者损失承担责任。如果你是在本网站上展示的一个网站的原拥有者，并希望您的网站不再此被展示，请致信 tktktk@tktktk.com。</p>

          <button onClick={() => handleAccept()}>Accept 我已阅读并接受免责声明</button>
        </div>
      )
};

export default DisclaimerAlert;