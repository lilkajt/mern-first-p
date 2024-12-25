import { Button } from "@/components/ui/button";
import { useColorModeValue } from "@/components/ui/color-mode";
import { toaster, Toaster } from "@/components/ui/toaster";
import { useProductStore } from "@/store/product";
import { Box, Container, Heading, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";

function CreatePage() {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  });
  const {createProduct} = useProductStore();
  const handleAddProduct = async () => {
    const {success, message } = await createProduct(newProduct);
    console.log(`Success : ${success}, Message: ${message}`);
    if (!success){
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
      })
    } else {
      toaster.create({
        title: "Success",
        description: message,
        type: "success",
      })
    }
    setNewProduct({ name: '', price: '', image: '' });
  };
  return (
    <Container maxW={"container.sm"}>
      <VStack
      spacing={8}
      >
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create a new product
        </Heading>
        <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        p={6}
        rounded={"lg"}
        shadow={"md"}
        >
          <VStack gap={4}>
            <Input
            placeholder="Product name"
            name="name"
            variant="subtle"
            value={newProduct.name} 
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            />
            <Input
            placeholder="Price"
            name="price"
            type="number"
            variant="subtle"
            value={newProduct.price} 
            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
            />
            <Input
            placeholder="Image url"
            name="image"
            variant="subtle"
            value={newProduct.image} 
            onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
            />
            <Button colorPalette="blue" onClick={handleAddProduct} w="full">Add product</Button>
          </VStack>
          <Toaster />
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage