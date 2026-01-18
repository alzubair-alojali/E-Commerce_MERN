import { Box, Container, Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import type { IProduct } from "../types/Product";
import { BASE_URL } from "../constants/BaseUrl";


export const HomePage = () => {
    const [products, setproduct] = useState<IProduct[]>([])
    const [error, seterror] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/product`);
                const data = await response.json();
                setproduct(data);
            } catch {
                seterror(true)
            }
        }
        fetchData();
    }, [])

    if (error) {
        return <Box>somting went wrong</Box>
    }
    return (
        <Container maxWidth={false} sx={{ mt: 2 }} >
            <Grid container spacing={2}>
                {products.map((product) => (
                    <Grid size={4}>
                        <ProductCard {...product} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
};