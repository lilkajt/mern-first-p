import ProductCard from "@/components/productCard";
import { useProductStore } from "@/store/product";
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { useEffect } from "react"
import { Link } from "react-router-dom"

function HomePage() {
  const {fetchProducts, products} = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text
        fontSize={30}
        fontWeight={"bold"}
        textAlign={"center"}
        bgGradient={"to-r"}
        gradientFrom={"cyan.400"}
        gradientTo={"blue.500"}
        bgClip={"text"}
        >
          Current Products 🚀
        </Text>
        <SimpleGrid columns={{base: 1, md: 2, lg: 3}} gap={"40px"} w={"full"}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>
        {products.length === 0 && (
          <Text
          fontSize={"xl"}
          textAlign={"center"}
          fontWeight={"bold"}
          color={"gray.500"}
          >
            No product found {"😢"}
            <Link to={"/create"}>
              <Text as={"span"} color={"blue.500"} _hover={{textDecoration: "underline"}}>
                Create a product
              </Text>
            </Link>
          </Text>
          )}
      </VStack>
    </Container>
  )
}

export default HomePage