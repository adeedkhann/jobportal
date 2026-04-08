import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoute = ({ children, allowedRole }) => {
    const { user } = useSelector((store) => store.auth);

    if (!user) {
        toast.error("your role doesnt allow that action")
        return <Navigate to="/auth" />;
    }
    if (user.role !== allowedRole) {
        toast.error("your role doesnt allow that action")
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;