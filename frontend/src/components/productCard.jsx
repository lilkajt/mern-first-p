import { Box, Heading, HStack, IconButton, Image, Input, Text, VStack } from "@chakra-ui/react"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "@/store/product";
import { Toaster, toaster } from "@/components/ui/toaster"
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";

function ProductCard({product}) {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const {deleteProduct, editProduct} = useProductStore();
    const handleDeleteProduct = async (id) => {
        const {success, message} = await deleteProduct(id);
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
    }
    const handleUpdateProduct = async (id, updatedProduct) => {
        const {success, message} = await editProduct(id, updatedProduct);
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
    }
  return (
    <Box
    shadow={"lg"}
    rounded={"lg"}
    overflow={"hidden"}
    transition={"all 0.3s"}
    _hover={ {transform: "translateY(-5px)", shadow: "xl"} }
    bg={bg}
    >
        <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"} />
        <Box p={4}>
            <Heading as={"h3"} size={"md"} mb={2}>
                {product.name}
            </Heading>
            <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
                ${product.price}
            </Text>
            <HStack spacing={2}>
                <DialogRoot placement="center" size={'lg'}>
                <DialogTrigger asChild>
                    <IconButton colorPalette={'blue'} ><FaEdit /></IconButton>
                </DialogTrigger>
                <DialogContent>
                    <DialogCloseTrigger />
                    <DialogHeader>
                        <DialogTitle>Update product</DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                        <VStack gap={4}>
                            <Input
                            placeholder="Product name"
                            name="name"
                            variant="subtle"
                            value={updatedProduct.name}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
                            />
                            <Input
                            placeholder="Price"
                            name="price"
                            type="number"
                            variant="subtle"
                            value={updatedProduct.price}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
                            />
                            <Input
                            placeholder="Image url"
                            name="image"
                            variant="subtle"
                            value={updatedProduct.image}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
                            />
                        </VStack>
                    </DialogBody>
                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button onClick={() => handleUpdateProduct(product._id,updatedProduct)}>Save</Button>
                        </DialogActionTrigger>
                        <DialogActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogActionTrigger>
                    </DialogFooter>
                </DialogContent>
                </DialogRoot>
                <IconButton onClick={() => handleDeleteProduct(product._id)} colorPalette={"red"}>
                <MdDelete /></IconButton>
            </HStack>
        </Box>
        <Toaster />
    </Box>
  )
}

export default ProductCard