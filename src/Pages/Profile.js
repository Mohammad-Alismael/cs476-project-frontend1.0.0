import React, {Component} from 'react';

class Profile extends Component {
    render() {
        return (
            <section className="top">
                <h1>My Details</h1>
                <h3>Personal Information</h3>
                <hr/>
            </section>
        <section className="middle">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-sm-4 col-md-4 paragraph">
                        <p>Assertively utilize adaptive customer<br>
                        service for future-proof platforms.
                            Completely drive optimal martkets</p>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 form">
                        <form className="personal-info" action="profile.html" method="post">
                            <label className="name" htmlFor="fname">NAME</label>
                            <input type="text" name="fname" value=""/>
                                <label htmlFor="birth-date">BIRTH DATE </label>
                                <input className="birth" type="date" name="birth-date" value=""><br>
                                    <label htmlFor="phone-number">PHONE NUMBER</label>
                                    <input className="tel" type="tel" name="phone-number" value=""><br>
                                        <button type="submit" name="button">SAVE</button>
                        </form>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4">
                        <label htmlFor="lname">SECOND NAME </label>
                        <input type="text" name="lname" value=""><br/>

                    </div>
                </div>
            </div>


        </section>

        <section className="bottom">
            <h3>E-mail adress</h3>
            <hr>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-4">
                            <p>Assertively utilize adaptive customer <br>service for future-proof platforms.<br>Completely
                                drive optimal martkets</p>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4">

                            <label htmlFor="email">E-MAIL ADRESS</label>
                            <input type="email" name="email" value="">
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4">
                        </div>
                    </div>
                </div>
        </section>
        );
    }
}

export default Profile;