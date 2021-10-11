import React, { useContext } from 'react';
import { withRouter } from 'react-router';
import NavbarDoctor from './NavbarDoctor';
import Cookies from 'universal-cookie';


class PatientProfile extends React.Component{
    constructor(props) {

        super(props);
        this.state =
            {
                "fname" : "",
                "lname" : "",
                "email" : "",
                "contact_no" : "",
                "address" : "",
                "password" : ""

            }


        this.fname = this.fname.bind(this);
        this.lname = this.lname.bind(this);
        this.contact_no = this.contact_no.bind(this);
        this.address = this.address.bind(this);
        this.email = this.email.bind(this);
        this.password = this.password.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


    }

    componentDidMount() {
        const cookies = new Cookies();
        var api_get = "http://localhost:8080/auth/v1/get_by_id?user_id=" + cookies.get('u_id')
        fetch(api_get)
            .then(resp => resp.text())
            .then(data => {
                    alert(data)
                    const json = JSON.parse(data);


                    //alert(myobj[0].fname)
                    this.setState({ fname : json[0].fname });
                    this.setState({ lname : json[0].lname });
                    this.setState({ email : json[0].email });
                    this.setState({ contact_no : json[0].contact_no });
                    this.setState({ password : json[0].password });
                    this.setState({ address : json[0].address });

                }
            );


    }

    /**
     * Submit function
     */
    onSubmit() {


        const cookies = new Cookies();
        var api_get = "http://localhost:8080/auth/v1/update_user"

        console.log(this.state);
        const requestOptions = {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({

                email : this.state.email,
                password : this.state.password,
                fname : this.state.fname,
                lname : this.state.lname,
                contact_no : this.state.contact_no,
                address : this.state.address,
                u_id : cookies.get('u_id')


            })
        }

        fetch("http://localhost:8080/auth/v1/update_user", requestOptions)
            .then(resp => resp.text())
            .then(data => {
                if (data.length != 0) {
                    alert("updates")
                    //const json = JSON.parse(data);

                } else {
                    alert("Updated Successfully");
                }
            });


    }

    /**
     * @param event
     */
    fname = (event) => {
        this.setState({ fname : event.target.value });
        console.log(this.state);
    };

    /**
     * @param event
     */
    lname = (event) => {
        this.setState({ lname : event.target.value });
        console.log(this.state);
    };


    /**
     * @param event
     */
    email = (event) => {
        this.setState({ email : event.target.value });
        console.log(this.state);
    };


    /**
     * @param event
     */
    contact_no = (event) => {
        this.setState({ contact_no : event.target.value });
        console.log(this.state);
    };

    /**
     * @param event
     */
    address = (event) => {
        this.setState({ address : event.target.value });
        console.log(this.state);
    };

    /**
     * @param event
     */
    password = (event) => {
        this.setState({ password : event.target.value });
        console.log(this.state);
    };
  
  
  
  
  render()
    {
        return (
            <div>
                <NavbarDoctor/>
                <div className="contact-wrapper">
                    <div className="container-fluid no-padding">
                        <div className="row">
                            <div className="col-md-12">
                                <h3><i>My Profile</i></h3>
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRQqhlB3K44SR3hw30aQyZ1-9DGZvvMRbu4Q&usqp=CAU"
                                    className="img-responsive" height="480" width="350"/>
                            </div>
                        </div>
                    </div>

                    <form id="contact-form" className="form-horizontal" role="form">

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form3Example9">First Name</label>
                            <input type="text" className="form-control" id="name" value={ this.state.fname } name="name"
                                   onChange={ this.fname } required/>
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form3Example9">Last Name</label>
                            <input type="text" className="form-control" id="name" value={ this.state.lname } name="name"
                                   onChange={ this.lname } required/>
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form3Example9">Email address</label>
                            <input type="text" className="form-control" id="name" value={ this.state.email } name="name"
                                   onChange={ this.email } required/>
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form3Example9">Password</label>
                            <input type="password" className="form-control" id="name" value={ this.state.password }
                                   name="name" onChange={ this.password } required/>
                        </div>

                        {/*<div className="form-outline mb-4">
                <label className="form-label" for="form3Example9">Contact No</label>
                <input type="text" className="form-control" id="name"value={this.state.contact_no} name="name" onChange={this.contact_no} required/>
                </div>
        */ }
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form3Example9">Address</label>
                            <input type="text" className="form-control" id="name" value={ this.state.address }
                                   name="name" onChange={ this.address } required/>
                        </div>


                        <button className="btn btn-primary send-button" id="submit" type="button" value="SEND"
                                onClick={ this.onSubmit }>
                            <div className="alt-send-button">
                                <i className="fa fa-paper-plane"/><span className="send-text">Update</span>
                            </div>

                        </button>

                    </form>
                </div>
            </div>
        );
    }
}
export default withRouter(PatientProfile);