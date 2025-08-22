import './Intermediate.css';
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";

const Intermediate = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div id="one">
                <h1>From EMI to #HMI - House Monthly Income</h1>
                <p>
                    Share your house for rent & earn up to ₹36,000 as #HMI. 
                    Earn fixed income per month, guaranteed weekly payments, no hidden conditions.
                </p>
                <Button
                    variant="ghost"
                    class="bg-green-600"
                    onClick={() => navigate('/host')}
                >
                    <h4>START EARNING</h4>
                </Button>
            </div>

            
            <div id="two" class="video-section">
                <iframe
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/CFURyErdnM8?controls=0&start=15&autoplay=1&loop=1&playlist=CFURyErdnM8"
                    title="House Renting Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
                <h1>3 Simple Steps to Start Earning with Your House</h1>
                
                <div class="steps">
                    <div class="step">
                        <h2>1. Sign Up for Free!</h2>
                        <p>
                            Join the Housing.com Host program for free by completing a quick sign-up form. 
                            It takes less than 2 minutes. No hidden charges.
                        </p>
                    </div>
                    <div class="step">
                        <h2>2. Verify Your Documents!</h2>
                        <p>
                            Submit your house details for verification. Our team will complete the checks within 24 hours.
                        </p>
                    </div>
                    <div class="step">
                        <h2>3. Share and Earn</h2>
                        <p>
                            Rent out your house through the Housing.com Host platform whenever it is unoccupied. 
                            Enjoy the flexibility of sharing as per your convenience.
                        </p>
                    </div>
                </div>
                <img src='https://i.pinimg.com/originals/b7/8a/20/b78a20ec0439fd39a8b0bd324e2af758.jpg'
            />
            </div>
            
            <h1 class="h">Why Choose Housing.com for Hassle-Free Renting?</h1>

            <div id="secpart">
                <div id="four">
                    <div>
                        <h3>Hassle-Free Renting</h3>
                        <p>No involvement of brokers. Enjoy a seamless renting experience.</p>
                    </div>
                    <div>
                    
                        <h3>Your House is Safe</h3>
                        <p>
                            All renters are verified with valid ID proofs. We maintain complete renter details for your safety.
                        </p>
                    </div>
                    <div>
                        <h3>Contactless Renting</h3>
                        <p>Our technology ensures a secure, contactless renting experience.</p>
                    </div>
                    <div>
                        <h3>Flexibility in Sharing</h3>
                        <p>Rent your house whenever it suits you, with no restrictions.</p>
                    </div>
                    <div>
                        <h3>24/7 Customer Support</h3>
                        <p>Reach out to us anytime via call, chat, or email. We've got your back!</p>
                    </div>
                </div>
            </div>

            <div id="thirddetail">
                <h1>Growing Rapidly</h1>
                <p>Join the Host program and be part of the largest tech-enabled house renting marketplace.</p>
            </div>

            <div id="thirdpart">
                <div class="thirddiv">
                    <img 
                        src="https://www.zoomcar.com/zap/subscribe/build/e3a6d127cac35a3a7a139256bb3761eb.png" 
                        alt="5000+ Satisfied Hosts" 
                    />
                    <h1>5000+</h1>
                    <p>Satisfied hosts</p>
                </div>
                <div class="thirddiv">
                
                    <h1>5 Lac+</h1>
                    <p>Bookings served</p>
                </div>
                <div class="thirddiv">
                  
                    <h1>10 Lac+</h1>
                    <p>Bookings reserved</p>
                </div>
                <div class="thirddiv">
                    <img 
                        src="https://www.zoomcar.com/zap/subscribe/build/c0db9479a08980b830b63433f60d336c.png" 
                        alt="120 Cr+ Earned by Hosts" 
                    />
                    <h1>₹120 Cr+</h1>
                    <p>Earned by hosts</p>
                </div>
            </div>

            <div class="cal">
                <h1>Share Your</h1>
                <h1 class="gre">House</h1>
            </div>
            <div class="cal">
                <h1>And Earn Up to </h1>
                <h1 class="gre">₹36,000</h1>
                <h1> Per Month</h1>
            </div>

            <div id="lastpart">
                <h3>Earn a fixed amount per sharing hour</h3>
                <button>Calculate Earning</button>
                <a href="#">How do we estimate your earning</a>
              
                <div>
                    <h5>Users love the Zoomcar Host program. Our app has 4.5+ rating on the Play Store!</h5>
                </div>
            </div>

            <div id="fifth">
                <h1>Still Have Questions?</h1>
                <div class="line">
                    <p>Do I need to meet renters personally?</p>
                    <p>How will I get paid?</p>
                    <p>What if my house gets damaged?</p>
                    <p>How much will I earn?</p>
                    <p>How is the rental price decided?</p>
                </div>
            </div>

            <div id="six">
                <h1>Still Confused?</h1>
                <div>
                    <div>
                        <h3>We Are Here to Help</h3>
                        <p>Visit the detailed FAQs section or contact us for more details.</p>
                    </div>
                    <div class="subsix">
                        <h4>FAQs</h4>
                        <h4>CONTACT US</h4>
                    </div>
                </div>
            </div>

            <div id="foot">
                <h3>Powered by Housing.com</h3>
            </div>
        </div>
    );
}

export default Intermediate;
