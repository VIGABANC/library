import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import "../styles/login-signup.css";
import { setUser, addUser } from "../redux/slices/userSlice"; 

export default function Login() {
    const { UserAction } = useParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Users = useSelector((state) => state.user.users);

    useEffect(() => {
        if (UserAction !== "login" && UserAction !== "signUp") {
            console.error("Invalid UserAction:", UserAction);
        }
        console.log("Users state:", Users);
    }, [UserAction, Users]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (UserAction === "login") {
            const user = Users.find(
                (user) => user.email === email && user.password === password
            );

            if (user) {
                dispatch(setUser({ user }));
                alert(`User ${user.email} logged in successfully`);
                navigate(`/Dashboard/${user.id}`);
            } else {
                alert("Invalid email or password!");
                console.error("User not found or password incorrect!");
            }
        }
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        if (UserAction === "signUp") {
            if (password !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }

            const newUser = {
                id: Users.length + 1,
                username: username,
                email: email,
                password: password, 
                role: role,
                profileImage: null,
            };
            dispatch(addUser(newUser));
            dispatch(setUser({ user: { id: newUser.id, username, email, role } })); 
            console.log("User added:", newUser);
            console.log("Signing up...");
            alert(`User ${newUser} signed up successfully`);
            navigate("/Dashboard"); 
        }
    };

    return (
        <div className="containerLogin">
            <form onSubmit={UserAction === "login" ? handleLogin : handleSignUp}>
                {UserAction === "login" ? (
                    <div className="Login">
                        <h1>Login</h1>
                        <div className="Form">
                            <input
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit">Login</button>
                            <p>
                                <Link to={"/Login/SignUp"}>Don't have an account?</Link>
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="SignUp">
                        <h1>Sign Up</h1>
                        <div className="Form">
                            <input
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button type="submit">Sign Up</button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}
