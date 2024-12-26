import { Container, Text, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"

function HomePage() {
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
      </VStack>
    </Container>
  )
}

export default HomePage