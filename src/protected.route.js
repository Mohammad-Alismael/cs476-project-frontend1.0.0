import React, {useEffect} from "react";
import { Route, Redirect } from "react-router-dom";
import ShoppingCart from "./Pages/ShoppingCart";
import LayoutDefault from "./Pages/LayoutDefault";


export const ProtectedRoute = ({component: Component, ...rest}) => {
    useEffect(() => {

    });
    if (rest.userType == "all"){
        return (
            <Route
                {...rest}
                render={props => {
                    if (sessionStorage.getItem("isLoggedIn") == "true") {
                        return <Component {...props} />;
                    } else {
                        return (
                            <Redirect
                                to={{
                                    pathname: "/areNotLoggedIn",
                                    state: {
                                        from: props.location
                                    }
                                }}
                            />
                        );
                    }
                }}
            />
        );
    }else {
        return (
            <Route
                {...rest}
                render={props => {
                    if (sessionStorage.getItem("isLoggedIn") == "true" && sessionStorage.getItem("userType") == rest.userType) {
                        return <Component {...props} />;
                    } else {
                        return (
                            <Redirect
                                to={{
                                    pathname: "/areNotLoggedIn",
                                    state: {
                                        from: props.location
                                    }
                                }}
                            />
                        );
                    }
                }}
            />
        );
    }
};