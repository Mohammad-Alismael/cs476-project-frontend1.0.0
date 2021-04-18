import React, {Component} from 'react';

class ProfileSettings extends Component {
    render() {
        return (
            <div>
             <body>
  <section class="personal">

    <form>


      <div class="container">
        <h1>Personal Info</h1>
        <div class="row">

          <div class="col-lg-6 col-md-6 col-sm-6">
            <label for="text" class="form-label">First Name</label>
            <input class="form-control" type="email" name="fName">
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6">
            <label for="text" class="form-label">Last Name</label>
            <input class="form-control" type="email" name="lName">

          </div>
          <div class="col-lg-6 col-md-6 col-sm-6">
            <label for="email" class="form-label">Email address</label>
            <input class="form-control" type="email" name="email">

          </div>
          <div class="col-lg-6 col-md-6 col-sm-6">
            <p>Didn't get a verification email?</p>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6">
            <label for="text" class="form-label">Username</label>
            <input class="form-control" type="text" name="username">
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6">
            <label for="text" class="form-label">Display Name</label>
            <input class="form-control" type="text" name="display">
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6">
            <p class="check">Check your inbox to confirm ownership of this email address.</p>
          </div>
          <div class="col-lg-12 col-md-12 col-sm-12">
            <textarea class="form-control" rows="5"></textarea>
            <p class="brief">Brief description for your profile</p>
          </div>
        </div>
      </div>
    </form>
  </section>

  <section class="social">
    <div class="container">
      <h1>Social profiles</h1>
      <div class="row">

        <div class="col-lg-12 col-md-12 col-sm-12">
          <label for="text" class="form-label">Facebook</label>
          <input class="form-control" type="text" name="facebook">

        </div>
        <div class="col-lg-12 col-md-12 col-sm-12">
          <label for="text" class="form-label">Twitter</label>
          <input class="form-control" type="text" name="twitter">

        </div>
        <div class="col-lg-12 col-md-12 col-sm-12">
          <input class="form-control" type="text" name="another" placeholder="Add another social profile">


        </div>


  </section>
            </div>
        );
    }
}

export default ProfileSettings;
