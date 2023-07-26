import { useContext } from "react";
import { UserContext, verifyRole } from "context/Context";

const ProtectedComponent = ({ roleNeeded, children }) => {
    const { user } = useContext(UserContext);

    if (!verifyRole(user?.role, roleNeeded))
        return null;

    return (children);
}

export default ProtectedComponent;