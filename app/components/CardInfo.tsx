import './cardInfo.css'
type PropsCardInfo={
   tipo:string
   titulo:string
   descricao:string
}

export default function CardInfo({tipo,titulo,descricao}:PropsCardInfo) {

   return (
      <div className={tipo + ' card'}>
            <h1 className="cardTitle">{titulo}</h1>
            <p className="cardInfo">{descricao}</p>
      </div>
   )
}