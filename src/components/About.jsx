import React from 'react'
import Navbar from './shared/Navbar';
import Footer from 'src/components/shared/Footer';

class About extends React.Component{
    render(){
        return(
         <div> 
             <Navbar></Navbar>
             <div className="container margin-top-75">
                <h1 className="mt-4 mb-3">About Us
                </h1>
                <div className="row">
                    <div className="col-md-6">
                        <img src="http://www.hanedanrpg.com/photos/hanedanrpg/27/134301.jpg" alt="..." className="img-rounded img-yy"></img>
                    </div>
                    <div className="col-md-6 pad-ab">
                        <h2>About Kung-Fu</h2>
                        <p>Kung Fu (pronounced wing chun) is an ancient Chinese martial art that was designed in times of war as an effective military technology. We practice it in modern times to defend ourselves in the streets, as well as explore our own economy of motion, and to develop deeper relaxation. The main principles of the systemare centerline, efficiency, and relaxation. To achieve optimal execution of these principles, we practice forms and two person drills.</p>
                        <h4>"The person who says it cannot be done. Should not interrupt the person doing it."</h4>
                        <p>-Chinese Proverb </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 md-4">
                      <h2>Head Master</h2>
                      <div className="row textcenter th-pad">
                        <div className="thumbnail">
                            <img className="img-mas" 
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt5lRuPJoc9QtahpbyUoMGAtZCXoEwOPaKKqM4xJEud-8zN3pQ" alt="">
                            </img>
                            <div className="caption">
                                <h4>Bruce Lee</h4>
                            </div>
                            <p  className="caption-full">Experienced and Co-operative Master from whom you can learn Kung-Fu Efficently.Won gold in Korea at the World Championships in 1997.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8">
                         <h2>Our Students</h2>
                         <div className="row">
                            <div className="col-md-5">
                                <a href="#">
                                <img className="img-fluid rounded mb-3 mb-md-0 img-ju" 
                                     src="https://www.thesun.co.uk/wp-content/uploads/2016/08/nintchdbpict000259290812.jpg?w=960" alt=""></img>
                                </a>
                            </div>
                            <div className="col-md-7">
                                <h3>Junior Program</h3>
                                <p>Through the practice of Kung Fu, a student learns to  procrastination and fear.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-5">
                                <a href="#">
                                <img className="img-fluid rounded mb-3 mb-md-0 img-ju" 
                                     src="https://kungfuquebec.com/wp-content/uploads/2016/09/kung-fu-quebec-parent-enfant-plaisir-1024x683.jpg" alt=""></img>
                                </a>
                            </div>
                            <div className="col-md-7">
                                    <h3>Parent Program</h3>
                                    <p>We also provide Kung-Fu training to Parents of enrolled Students!</p>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
             <Footer></Footer>
             </div>   
        )
    }
}

export default About