import React from "react";

export const UserContext = React.createContext(null);

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = React.useState(null);

//   return (
//     <UserContext.Provider value={[user, setUser]}>
//       {children}
//     </UserContext.Provider>
//   );
// };
