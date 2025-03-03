"use client"

const RenderItems = ({ titulo, produtos }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{titulo}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {produtos.length > 0 ? (
          produtos.map((produto) => (
            <div key={produto._id} className="p-4 border rounded-lg shadow">
              <img src={produto.imagem} alt={produto.nome} className="w-full h-40 object-cover" />
              <h3 className="mt-2 font-semibold">{produto.nome}</h3>
              <p className="text-gray-700">{produto.descricao}</p>
              <p className="text-lg font-bold text-green-600">R$ {produto.preco_unitario.toFixed(2)}</p>
            </div>
          ))
        ) : (
          <p>Nenhum produto disponível.</p>
        )}
      </div>
    </div>
  );
};

export default RenderItems;
