import Link from "next/link";
import { Vehicle, VehicleImage } from "@prisma/client";

type VehicleWithImages = Vehicle & { images: VehicleImage[] };

const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function VehicleCard({ vehicle }: { vehicle: VehicleWithImages }) {
  const image = vehicle.images[0]?.imageUrl ?? "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=900&q=85";

  return (
    <article className="vehicle-card">
      <Link href={`/veiculos/${vehicle.slug}`}>
        <div className="vehicle-image">
          <img src={image} alt={`${vehicle.brand} ${vehicle.model}`} loading="lazy" />
          <span className="tag year">{vehicle.year}</span>
          {vehicle.featured && <span className="tag owner">Único dono</span>}
        </div>
        <h3>{vehicle.brand} {vehicle.model}</h3>
        <p>{vehicle.version}</p>
        <ul>
          <li>{vehicle.transmission}</li>
          <li>{vehicle.fuel}</li>
          <li>{vehicle.mileage.toLocaleString("pt-BR")} km</li>
        </ul>
        <strong>{money.format(Number(vehicle.price))}</strong>
      </Link>
    </article>
  );
}
