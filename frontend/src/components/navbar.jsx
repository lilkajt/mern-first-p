import { Container, Flex, HStack, Text } from "@chakra-ui/react"
import { CiSquarePlus } from "react-icons/ci"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { ColorModeButton } from "./ui/color-mode"

function Navbar() {
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex 
        h={16} 
        alignItems={"center"} 
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row"
        }}
      >
        <Text
          fontSize={{
            base: "22px",
            sm: "28px"
          }}
          fontWeight="bold"
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button variant="subtle">
              <CiSquarePlus fontSize={20} />
            </Button>
          </Link>
          <ColorModeButton />
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar