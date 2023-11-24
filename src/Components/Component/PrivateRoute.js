// import React from 'react'
// import { Route, redirect } from 'react-router-dom'
// // import {useAuthContext} from '../Context/AuthContext'
// import { useAuthContext } from '../Context/AuthContext'

// const PrivateRoute = ({component: Component, roles, ...rest}) => {
// const {user} = useAuthContext();
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         if(!user){
//           return <redirect to='/Login' />
//         }
//         if(roles && !roles.includes(user.role)){
//           return <redirect to='/'></redirect>
//         }
//         return <Component {...props} />
//       }}
//     />
//   )
// }

// export default PrivateRoute
