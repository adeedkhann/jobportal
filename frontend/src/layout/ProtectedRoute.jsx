import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";


const ProtectedRoute = ({ children, allowedRole }) => {

    const navigate = useNavigate()

    const { user ,loading} = useSelector((store) => store.auth);
    if (loading) return null;
    if (!user) {
        toast.error("authentication error")
        return navigate("/auth")
    }
    if (user.role !== allowedRole) {
        toast.error("your role doesnt allow that action")
        return navigate("/")
    }

    return children;
};

export default ProtectedRoute;