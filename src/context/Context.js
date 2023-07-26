import React from "react";

export const UserContext = React.createContext({
    user: null,
    setUser: () => {},
});

export const UserRole = Object.freeze({
	ADMIN: 0,
	ENGINEER: 1,
	MECHANIC: 2,
	// Add any other roles you need here
});

export const verifyRole = (userRole, roleNeeded) => {
    const current = (typeof userRole === 'number') ? userRole : UserRole[userRole?.toUpperCase()];
    const needed = (typeof roleNeeded === 'number') ? roleNeeded : UserRole[roleNeeded?.toUpperCase()];
	if (current <= needed) {
		return true;
	}
	return false; // You don't have the necessary permissions
};
