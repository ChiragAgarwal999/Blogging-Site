import React from 'react'

function Footer() {
  return (
    <>
        <footer>
            <div className="container-fluid p-4 d-flex justify-content-between" style={{backgroundColor:"black",color:'white'}}>
                <div className='d-flex gap-3'>
                    <div>
                    <a className="navbar-brand">
                    <img 
                        src="https://1.bp.blogspot.com/-yIt05NVyOF0/WdYdw6FRM7I/AAAAAAAAA2c/Y8szr6n7DNwk_og9uPp8Fw1Wvz2PwAMZQCLcBGAs/s1600/Letter%2BB%2BLogo%2BDesign%2BDesign%2BTransparent%2Bfree.png" 
                        alt="Logo" 
                        width="80px"
                    />
                </a>
                    </div>
                    <div>
                        <h5>Fantasy Blogger</h5>
                        <p>175 FOREST STREET</p>
                        <p>JAIPUR RAJASTHAN</p>
                        <p>PIN 302019</p>
                    </div>
                </div>
                <div className='d-flex gap-5'>
                    <div className='text-center me-5'>
                        <h6  style={{color:'blue'}}>Follow US.</h6>
                        <div className='d-flex gap-1'>
                        <a href="https://www.instagram.com/" target="_blank" >
                            <img src='/Images/instagram.png' alt="Instagram Logo" className="social-icon" width="30px"/>
                        </a>
                        <a href="https://www.facebook.com/" target="_blank">
                            <img src='/Images/facebook.png' alt="Facebook Logo" className="social-icon" width="30px"/>
                        </a>
                        <a href="https://twitter.com/" target="_blank">
                            <img src='/Images/twitter.png' alt="Twitter Logo" className="social-icon" width="30px"/>
                        </a>
                        <a href="https://telegram.org/" target="_blank">
                            <img src='/Images/telegram.png' alt="Telegram Logo" className="social-icon" width="30px"/>
                        </a>
                        <a href="https://github.com/" target="_blank">
                            <img src='/Images/github.png' alt="GitHub Logo" className="social-icon" width="30px"/>
                        </a>
                        </div >
                        <h6 style={{color:'blue'}} className='mt-2'>Visit Us:-</h6>
                        <div>Map & Direction</div>
                        <div>Plan your visit.</div>
                        <div>Virtual tour.</div>
                    </div>
                    <div className='ms-5'>
                        <div  style={{color:'blue'}}>Support US:-</div>
                        <div className="btn btn-light mt-2">Make A Gift</div>
                        <div  style={{color:'blue'}} className='mt-5'>Work with us:-</div>
                        <div>View Jobs.</div>
                    </div>
                </div>
                <div>
                <div  style={{color:'blue'}}>Resources & Links:-</div>
                    <div className='d-flex gap-5'>
                    <div>
                        <div>Library</div>
                        <div>Title IX</div>
                        <div>Register</div>
                    </div>
                    <div>
                        <div>Blackboard</div>
                        <div>My Bentley</div>
                        <div>Emergency</div>
                        <div>info</div>
                    </div>
                    </div>
                </div>
            </div>
        </footer>
    </>
  )
}

export default Footer