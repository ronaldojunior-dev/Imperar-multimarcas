import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/password";
import { uniqueVehicleSlug } from "../lib/slug";

const prisma = new PrismaClient();

const image = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85`;

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@imperar.com.br";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "Admin@12345";

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Administrador",
      email: adminEmail,
      password: await hashPassword(adminPassword),
      role: "ADMIN"
    }
  });

  await prisma.user.upsert({
    where: { email: "vendedor@imperar.com.br" },
    update: {},
    create: {
      name: "Vendedor",
      email: "vendedor@imperar.com.br",
      password: await hashPassword("Vendedor@12345"),
      role: "VENDEDOR"
    }
  });

  const settings = await prisma.settings.findFirst();
  if (!settings) {
    await prisma.settings.create({
      data: {
        companyName: "Imperar Multimarcas",
        logo: "/logo.png",
        phone: "(48) 99212-5373",
        whatsapp: "5548992125373",
        email: "contato@imperar.com.br",
        address: "Loja 1: Rua Edelberto de Oliveira, nº 120 | Loja 2: Rua José Bonifácio de Souza, nº 193",
        instagram: "https://instagram.com/imperarmultimarcas",
        facebook: "https://facebook.com",
        youtube: "https://youtube.com",
        seoTitle: "Imperar Multimarcas - Carros selecionados",
        seoDescription: "Veículos multimarcas com procedência, financiamento e atendimento especializado."
      }
    });
  }

  const vehicles = [
    {
      brand: "Jeep",
      model: "Compass",
      version: "2.0 16V Flex Limited Automático",
      year: 2020,
      mileage: 45000,
      fuel: "Flex",
      transmission: "Automático",
      color: "Preto",
      doors: 4,
      plateFinal: "8",
      price: "114900.00",
      featured: true,
      status: "ATIVO" as const,
      description: "SUV completo, revisado, com laudo cautelar aprovado e excelente pacote de opcionais.",
      images: [image("photo-1606664515524-ed2f786a0bd6"), image("photo-1616788494707-ec28f08d05a1")]
    },
    {
      brand: "Toyota",
      model: "Corolla",
      version: "2.0 XEI 16V Flex Automático",
      year: 2019,
      mileage: 62000,
      fuel: "Flex",
      transmission: "Automático",
      color: "Branco",
      doors: 4,
      plateFinal: "3",
      price: "98900.00",
      featured: true,
      status: "ATIVO" as const,
      description: "Sedan confortável, econômico e com manutenção em dia.",
      images: [image("photo-1623869675781-80aa31012a5a"), image("photo-1549924231-f129b911e442")]
    },
    {
      brand: "Volkswagen",
      model: "T-Cross",
      version: "200 TSI 1.0 Flex Automático",
      year: 2021,
      mileage: 38000,
      fuel: "Flex",
      transmission: "Automático",
      color: "Cinza",
      doors: 4,
      plateFinal: "1",
      price: "89900.00",
      featured: true,
      status: "RESERVADO" as const,
      description: "Compacto premium, turbo, multimídia e baixa quilometragem.",
      images: [image("photo-1606152421802-db97b9c7a11b"), image("photo-1617814076367-b759c7d7e738")]
    }
  ];

  for (const vehicle of vehicles) {
    const slug = await uniqueVehicleSlug(vehicle.brand, vehicle.model, vehicle.version, vehicle.year);
    await prisma.vehicle.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        brand: vehicle.brand,
        model: vehicle.model,
        version: vehicle.version,
        year: vehicle.year,
        mileage: vehicle.mileage,
        fuel: vehicle.fuel,
        transmission: vehicle.transmission,
        color: vehicle.color,
        doors: vehicle.doors,
        plateFinal: vehicle.plateFinal,
        price: vehicle.price,
        featured: vehicle.featured,
        status: vehicle.status,
        description: vehicle.description,
        images: {
          create: vehicle.images.map((imageUrl, order) => ({ imageUrl, order }))
        }
      }
    });
  }

  await prisma.banner.createMany({
    data: [
      {
        title: "Seu próximo carro está aqui",
        image: image("photo-1542362567-b07e54358753"),
        link: "/estoque",
        active: true
      }
    ],
    skipDuplicates: true
  });

  await prisma.testimonial.createMany({
    data: [
      {
        name: "Marcos Almeida",
        photo: image("photo-1500648767791-00dcc994a43e"),
        text: "Atendimento transparente do começo ao fim. Saí com o carro financiado no mesmo dia.",
        active: true
      }
    ],
    skipDuplicates: true
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
