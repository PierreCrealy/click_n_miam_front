"use client";

import { useState } from "react";
import { Utensils, X, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface Order {
  id: number;
  email: string;
  plat: string;
  dessert: string;
  timestamp: string;
}

interface MenuItem {
  name: string;
  image: string;
  description: string;
  composition: string[];
  allergenes: string[];
}

const plats: MenuItem[] = [
  {
    name: "Poulet Rôti aux Herbes",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80",
    description: "Poulet fermier rôti aux herbes de Provence, accompagné de pommes de terre grenailles et légumes de saison",
    composition: [
      "Poulet fermier Label Rouge",
      "Herbes de Provence",
      "Pommes de terre grenailles",
      "Carottes",
      "Courgettes"
    ],
    allergenes: []
  },
  {
    name: "Gratin Dauphinois Végétarien",
    image: "https://images.unsplash.com/photo-1568574728383-011f8c185af0?auto=format&fit=crop&w=800&q=80",
    description: "Gratin de pommes de terre et légumes, préparé avec une sauce crémeuse aux trois fromages",
    composition: [
      "Pommes de terre",
      "Crème fraîche",
      "Emmental",
      "Comté",
      "Gruyère",
      "Oignons",
      "Ail"
    ],
    allergenes: ["Lait"]
  }
];

const desserts: MenuItem[] = [
  {
    name: "Tarte aux Pommes",
    image: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=800&q=80",
    description: "Tarte fine aux pommes caramélisées sur une pâte feuilletée maison",
    composition: [
      "Pommes Golden",
      "Pâte feuilletée",
      "Sucre roux",
      "Cannelle",
      "Beurre"
    ],
    allergenes: ["Gluten", "Lait", "Œufs"]
  },
  {
    name: "Mousse au Chocolat",
    image: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=800&q=80",
    description: "Mousse aérienne au chocolat noir 70% de cacao",
    composition: [
      "Chocolat noir 70%",
      "Œufs",
      "Sucre",
      "Crème"
    ],
    allergenes: ["Œufs", "Lait", "Soja"]
  }
];

export default function Home() {
  const [step, setStep] = useState<"email" | "plat" | "dessert" | "confirmation">("email");
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [selectedPlat, setSelectedPlat] = useState<string>("");
  const [selectedDessert, setSelectedDessert] = useState<string>("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const validateEmail = (email: string) => {
    if (!email.endsWith("@lycee-ndduroc.com")) {
      setEmailError("L'email doit se terminer par @lycee-ndduroc.com");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleEmailSubmit = () => {
    if (validateEmail(email)) {
      setStep("plat");
    }
  };

  const handlePlatSelection = (plat: string) => {
    setSelectedPlat(plat);
    setStep("dessert");
  };

  const handleDessertSelection = (dessert: string) => {
    setSelectedDessert(dessert);
    setStep("confirmation");
  };

  const confirmOrder = () => {
    const newOrder: Order = {
      id: Date.now(),
      email,
      plat: selectedPlat,
      dessert: selectedDessert,
      timestamp: new Date().toLocaleTimeString(),
    };
    setOrders([newOrder, ...orders]);
    setStep("email");
    setEmail("");
    setSelectedPlat("");
    setSelectedDessert("");
  };

  const resetOrder = () => {
    setStep("email");
    setEmail("");
    setSelectedPlat("");
    setSelectedDessert("");
    setEmailError("");
  };

  const MenuCard = ({ item, onSelect }: { item: MenuItem; onSelect: (name: string) => void }) => (
    <Card className="w-96 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <div 
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${item.image})` }}
        />
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-4 right-4 rounded-full bg-white/90 hover:bg-white border-orange-500 border text-orange-500 hover:text-orange-600"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedItem(item);
          }}
        >
          <AlertCircle className="h-4 w-4 mr-1" />
          Infos
        </Button>
      </div>
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-orange-500">{item.name}</h3>
        <Button 
          onClick={() => onSelect(item.name)}
          className="w-full bg-orange-500 hover:bg-orange-600"
        >
          Sélectionner
        </Button>
      </div>
    </Card>
  );

  // Filtrer les commandes par email
  const filteredOrders = orders.filter(order => order.email === email);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-orange-500 p-6 text-white text-center">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Utensils className="h-8 w-8" />
          Borne de Commande
        </h1>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        <div className="max-w-6xl mx-auto">
          {step !== "email" && (
            <Button
              onClick={resetOrder}
              variant="outline"
              className="mb-6"
            >
              <X className="h-4 w-4 mr-2" /> Annuler la commande
            </Button>
          )}

          {step === "email" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-green-600 mb-6 text-center">
                Entrez votre email
              </h2>
              <Card className="p-6 max-w-md mx-auto">
                <div className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="votre.email@lycee-ndduroc.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={emailError ? "border-red-500" : ""}
                    />
                    {emailError && (
                      <p className="text-red-500 text-sm mt-1">{emailError}</p>
                    )}
                  </div>
                  <Button
                    onClick={handleEmailSubmit}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    Commencer la commande
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {step === "plat" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-green-600 mb-6 text-center">
                Choisissez votre plat
              </h2>
              <div className="flex justify-center gap-8 flex-wrap">
                {plats.map((plat) => (
                  <MenuCard
                    key={plat.name}
                    item={plat}
                    onSelect={handlePlatSelection}
                  />
                ))}
              </div>
            </div>
          )}

          {step === "dessert" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-green-600 mb-6 text-center">
                Choisissez votre dessert
              </h2>
              <div className="flex justify-center gap-8 flex-wrap">
                {desserts.map((dessert) => (
                  <MenuCard
                    key={dessert.name}
                    item={dessert}
                    onSelect={handleDessertSelection}
                  />
                ))}
              </div>
            </div>
          )}

          {step === "confirmation" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-green-600 text-center">
                Confirmez votre commande
              </h2>
              <Card className="p-6 max-w-md mx-auto">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-500">Email:</h3>
                    <p className="text-xl">{email}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">Plat choisi:</h3>
                    <p className="text-xl">{selectedPlat}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">Dessert choisi:</h3>
                    <p className="text-xl">{selectedDessert}</p>
                  </div>
                  <Button
                    onClick={confirmOrder}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    Confirmer la commande
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Order History - Only shown when email is entered and valid */}
        {email && !emailError && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-green-600 mb-6 text-center">
              Vos commandes précédentes
            </h2>
            {filteredOrders.length > 0 ? (
              <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                <div className="flex p-4">
                  {filteredOrders.map((order) => (
                    <Card
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className="p-4 mr-4 min-w-[250px] bg-white border-green-200 cursor-pointer hover:shadow-lg transition-shadow"
                    >
                      <div className="space-y-2">
                        <p className="font-medium text-orange-500">
                          Commande de {order.timestamp}
                        </p>
                        <p className="text-sm">Plat: {order.plat}</p>
                        <p className="text-sm">Dessert: {order.dessert}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <p className="text-center text-gray-500">
                Vous n'avez pas encore passé de commande avec cet email.
              </p>
            )}
          </div>
        )}

        {/* Order Details Dialog */}
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Détails de la commande</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-500">Date et heure:</h3>
                <p>{selectedOrder?.timestamp}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Email:</h3>
                <p>{selectedOrder?.email}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Plat:</h3>
                <p>{selectedOrder?.plat}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Dessert:</h3>
                <p>{selectedOrder?.dessert}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Allergenes Dialog */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Informations pour : {selectedItem?.name}</DialogTitle>
              <DialogDescription>
                {selectedItem?.description}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {selectedItem?.allergenes.length ? (
                <div>
                  <h3 className="font-medium text-orange-500 mb-2">Allergènes présents :</h3>
                  <ul className="list-disc ml-4 space-y-1">
                    {selectedItem?.allergenes.map((allergene) => (
                      <li key={allergene} className="text-gray-700">{allergene}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div>
                <h3 className="font-medium text-green-600 mb-2">Composition :</h3>
                <ul className="list-disc ml-4 space-y-1">
                  {selectedItem?.composition.map((ingredient) => (
                    <li key={ingredient} className="text-gray-700">{ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}