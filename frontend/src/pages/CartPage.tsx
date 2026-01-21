import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/BaseUrl";
import { useAuth } from "../context/auth/AuthContext";




const CartPage = () => {


    const [cart, setcart] = useState();
    const [error, seterror] = useState("");
    const { token } = useAuth();

    useEffect(() => {
        if (!token) {
            return;
        }
        const fetchCart = async () => {
            const response = await fetch(`${BASE_URL}/cart`, {
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${token}`
                }
            })

            if (!response.ok) {
                seterror("failed to fetch cart, please try again later");
                return;
            }
            const data = await response.json();
            setcart(data);
        }
        fetchCart();
    }, [token])

    console.log(cart);


    return (
        <Container sx={{ mt: 2 }}>
            <Typography variant="h4">Cart Page</Typography>
            {error && <Typography color="error">{error}</Typography>}
        </Container>
    )

}


export default CartPage;