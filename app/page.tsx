import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { VehicleCard } from "@/components/VehicleCard";
import { whatsappUrl } from "@/lib/company";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const vehicles = await prisma.vehicle.findMany({
    where: { featured: true, status: { in: ["ATIVO", "RESERVADO"] } },
    include: { images: { orderBy: { order: "asc" } } },
    orderBy: { createdAt: "desc" },
    take: 5
  });

  return (
    <>
      <PublicHeader />
      <main>
        <section className="hero">
          <div className="hero-copy">
            <p>Seu próximo carro</p>
            <h1>Está aqui!</h1>
            <span className="red-line" />
            <p className="hero-text">As melhores oportunidades em multimarcas com qualidade e confiança que você merece.</p>
            <a className="primary-button" href={whatsappUrl()} target="_blank" rel="noreferrer">
              <span className="whatsapp-icon" aria-hidden="true">☎</span>
              Falar no WhatsApp
            </a>
          </div>
          <div className="hero-cars" aria-hidden="true">
            {vehicles.slice(0, 3).map((vehicle) => (
              <img key={vehicle.id} src={vehicle.images[0]?.imageUrl} alt="" />
            ))}
          </div>
          <div className="quality-badge">
            <strong>Qualidade<br />Procedência<br />e confiança</strong>
            <span>★ ★ ★</span>
          </div>
        </section>

        <form className="search-panel" action="/estoque">
          <div className="search-title">Encontre seu carro</div>
          <label>Marca<select name="brand"><option value="">Todas as marcas</option><option>Jeep</option><option>Toyota</option><option>Volkswagen</option></select></label>
          <label>Modelo<select name="q"><option value="">Todos os modelos</option><option>Compass</option><option>Corolla</option><option>T-Cross</option></select></label>
          <label>Ano de<select name="yearFrom"><option value="">Ano mínimo</option><option>2018</option><option>2019</option><option>2020</option></select></label>
          <label>Ano até<select name="yearTo"><option value="">Ano máximo</option><option>2024</option><option>2023</option><option>2022</option></select></label>
          <label>Preço até<select name="priceTo"><option value="">Preço máximo</option><option value="80000">R$ 80.000</option><option value="120000">R$ 120.000</option></select></label>
          <button className="danger-button" type="submit">Buscar veículos</button>
        </form>

        <section className="featured">
          <div className="section-heading">
            <h2>Desta<span>ques</span></h2>
            <Link href="/estoque">Ver todo estoque →</Link>
          </div>
          <div className="vehicle-grid">
            {vehicles.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}
          </div>
        </section>

        <section className="benefits">
          <article><span>✓</span><div><h3>Veículos <em>selecionados</em></h3><p>Só trabalhamos com carros de qualidade e procedência</p></div></article>
          <article><span>$</span><div><h3>Financiamento <em>facilitado</em></h3><p>As melhores taxas e condições para você realizar seu sonho</p></div></article>
          <article><span>⚙</span><div><h3>Garantia <em>e segurança</em></h3><p>Transparência em todo o processo para sua total segurança</p></div></article>
          <article><span>◇</span><div><h3>Atendimento <em>especializado</em></h3><p>Equipe pronta para te ajudar a fazer o melhor negócio</p></div></article>
        </section>

        <section className="sell-banner">
          <h2>Venda seu carro com segurança e rapidez!</h2>
          <p>Avaliamos seu veículo na hora e pagamos à vista!</p>
          <Link href="/vender-meu-carro">Quero vender meu carro</Link>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
