import "./dialog.css";
import PersonIcon from '@mui/icons-material/Person';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ArticleIcon from '@mui/icons-material/Article';
type Props = {
  dateIni: Date;
  isOpen: boolean;
  onClose: () => void;
};

export default function Dialog({ dateIni, isOpen, onClose }: Props) {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(JSON.stringify(data));
    const response = await fetch("/api/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      onClose();
    } else {
      console.log("Failed to create event");
    }
  };


  return (
    <div
      className={`dialog-overlay ${isOpen ? "open" : "closed"}`}
     
    >
      <div className="dialog">
        <h1>AGENDAR VISITA</h1>
        <section className="dialog-content">
          <form className="form-field" action="/api/evento" method="post" onSubmit={handleSubmit}>
            <div className="dialog-content-item">
              <label htmlFor="agent">
               <PersonIcon/>
                <input name="agent" type="text" id="agent"  placeholder="Agente"/>
              </label>
            </div>
            <div className="dialog-content-item">
              <label htmlFor="empresa">
               <LocationCityIcon/>
                <input name="empresa" type="text" id="empresa" placeholder="Empresa" />
              </label>
            </div>

            <div className="dialog-content-item">
              <label htmlFor="date">
                <input
                  type="date"
                  id="date"
                  name="date"
                  defaultValue={dateIni.toISOString().split("T")[0]}
                />
              </label>
            </div>
            <div className="dialog-content-item">
              <label htmlFor="time">
                <input type="time" id="time" name="hora" />
              </label>
            </div>
            <div className="dialog-content-item">
              <label htmlFor="description">
               <ArticleIcon/>
                <textarea id="description" name="descricao" placeholder="Descrição" ></textarea>
              </label>
            </div>
            <div className="dialog-content-buttons">
              <button className="btn-submit" type="submit" >
                Cadastrar
              </button>
              <button className="btn-neutral" type="button" onClick={onClose}>
                Cancelar
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
