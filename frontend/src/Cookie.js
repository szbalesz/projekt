import { useEffect, useState } from "react";
import { Button, Box, Text, VStack, HStack } from "@chakra-ui/react";
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogRoot,
} from "./components/ui/dialog";
import { LuCookie } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Cookie = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const consentGiven = localStorage.getItem("Cookie")=== "true";
    if (!consentGiven) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("Cookie", "true");
    setIsOpen(false);
    navigate("/");
  };

  return (
    <DialogRoot role={"alertdialog"} open={isOpen} placement={"center"} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogBody>
          <VStack spacing={3} align="center">
            <Box w={12} h={12}>
             <LuCookie size={"50px"}/>
            </Box>
            <Text fontSize="lg" fontWeight="bold">Próbáld ki a sütijeinket</Text>
            <Text fontSize="sm" textAlign="center">
            Mi sütiket használunk a weboldal működőképességének biztosításához, és a beleegyezéseddel weboldalunk tartalmának személyre szabásához is. Az "Értem" gombra kattintva elfogadod a sütik használatát.<br />
            </Text>
          </VStack>
        </DialogBody>
        <DialogFooter>
          <HStack spacing={4}>
              <Button onClick={handleAccept}>Értem</Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Elutasít mindent</Button>
          </HStack>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default Cookie;
