// import axios from "axios";
// import httpStatus from "http-status";
// import { createContext, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import server from "../environment";


// export const AuthContext = createContext({});

// const client = axios.create({
//     baseURL: `${server}/api/v1/users`
// })


// export const AuthProvider = ({ children }) => {

//     const authContext = useContext(AuthContext);


//     const [userData, setUserData] = useState(authContext);


//     const router = useNavigate();

//     const handleRegister = async (name, username, password) => {
//         try {
//             let request = await client.post("/register", {
//                 name: name,
//                 username: username,
//                 password: password
//             })


//             if (request.status === httpStatus.CREATED) {
//                 return request.data.message;
//             }
//         } catch (err) {
//             throw err;
//         }
//     }

//     const handleLogin = async (username, password) => {
//         try {
//             let request = await client.post("/login", {
//                 username: username,
//                 password: password
//             });

//             console.log(username, password)
//             console.log(request.data)

//             if (request.status === httpStatus.OK) {
//                 localStorage.setItem("token", request.data.token);
//                 router("/home")
//             }
//         } catch (err) {
//             throw err;
//         }
//     }

//     const getHistoryOfUser = async () => {
//         try {
//             let request = await client.get("/get_all_activity", {
//                 params: {
//                     token: localStorage.getItem("token")
//                 }
//             });
//             return request.data
//         } catch
//          (err) {
//             throw err;
//         }
//     }

//     const addToUserHistory = async (meetingCode) => {
//         try {
//             let request = await client.post("/add_to_activity", {
//                 token: localStorage.getItem("token"),
//                 meeting_code: meetingCode
//             });
//             return request
//         } catch (e) {
//             throw e;
//         }
//     }


//     const data = {
//         userData, setUserData, addToUserHistory, getHistoryOfUser, handleRegister, handleLogin
//     }

//     return (
//         <AuthContext.Provider value={data}>
//             {children}
//         </AuthContext.Provider>
//     )

// }


// import axios from "axios";
// import httpStatus from "http-status";
// import { createContext, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import server from "../environment";

// export const AuthContext = createContext({});

// const client = axios.create({
//     baseURL: `${server}/api/v1/users`
// });

// export const AuthProvider = ({ children }) => {
//     const router = useNavigate();

//     // Initialize userData with a proper default value
//     const [userData, setUserData] = useState(null);

//     const handleRegister = async (name, username, password) => {
//         try {
//             let request = await client.post("/register", {
//                 name,
//                 username,
//                 password
//             });

//             if (request.status === httpStatus.CREATED) {
//                 return request.data.message;
//             }
//         } catch (err) {
//             console.error("Registration error:", err);
//             throw err;
//         }
//     };

//     const handleLogin = async (username, password) => {
//         try {
//             let request = await client.post("/login", {
//                 username,
//                 password
//             });

//             if (request.status === httpStatus.OK) {
//                 localStorage.setItem("token", request.data.token);
//                 setUserData(request.data.user); // Update userData state
//                 router("/home");
//             }
//         } catch (err) {
//             console.error("Login error:", err);
//             throw err;
//         }
//     };

//     const getHistoryOfUser = async () => {
//         try {
//             let request = await client.get("/get_all_activity", {
//                 params: {
//                     token: localStorage.getItem("token")
//                 }
//             });
//             return request.data;
//         } catch (err) {
//             console.error("Fetch history error:", err);
//             throw err;
//         }
//     };

//     const addToUserHistory = async (meetingCode) => {
//         try {
//             let request = await client.post("/add_to_activity", {
//                 token: localStorage.getItem("token"),
//                 meeting_code: meetingCode
//             });
//             return request;
//         } catch (e) {
//             console.error("Add to history error:", e);
//             throw e;
//         }
//     };

//     const data = {
//         userData,
//         setUserData,
//         addToUserHistory,
//         getHistoryOfUser,
//         handleRegister,
//         handleLogin
//     };

//     return (
//         <AuthContext.Provider value={data}>
//             {children}
//         </AuthContext.Provider>
//     );
// };






import axios from "axios";
import httpStatus from "http-status";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import server from "../environment";

export const AuthContext = createContext();

const client = axios.create({
    baseURL: `${server}/api/v1/users`
});

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (name, username, password) => {
        try {
            const response = await client.post("/register", {
                name,
                username,
                password
            });

            if (response.status === httpStatus.CREATED) {
                return response.data.message;
            }
        } catch (err) {
            console.error("Registration error:", err);
            throw err.response?.data?.message || "Registration failed";
        }
    };

    const handleLogin = async (username, password) => {
        try {
            const response = await client.post("/login", {
                username,
                password
            });

            if (response.status === httpStatus.OK) {
                localStorage.setItem("token", response.data.token);
                setUserData(response.data.user); // Assuming response contains user data
                navigate("/home");
            }
        } catch (err) {
            console.error("Login error:", err);
            throw err.response?.data?.message || "Login failed";
        }
    };

    const getHistoryOfUser = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No token found");
            
            const response = await client.get("/get_all_activity", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (err) {
            console.error("History fetch error:", err);
            throw err.response?.data?.message || "Failed to fetch history";
        }
    };

    const addToUserHistory = async (meetingCode) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No token found");
            
            const response = await client.post("/add_to_activity", {
                meeting_code: meetingCode
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (err) {
            console.error("Add history error:", err);
            throw err.response?.data?.message || "Failed to add to history";
        }
    };

    const value = {
        userData,
        setUserData,
        addToUserHistory,
        getHistoryOfUser,
        handleRegister,
        handleLogin
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
