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
  return (
    <div
      className={`dialog-overlay ${isOpen ? "open" : "closed"}`}
      onClick={onClose}
    >
      <div className="dialog">
        <h1>AGENDAR VISITA</h1>
        <section className="dialog-content">
          <form action="/api/evento" method="post">
            <div className="dialog-content-item">
              <label htmlFor="title">
               <PersonIcon/>
                <input type="text" id="title"  placeholder="Agente"/>
              </label>
            </div>
            <div className="dialog-content-item">
              <label htmlFor="empresa">
               <LocationCityIcon/>
                <input type="text" id="empresa" placeholder="Empresa" />
              </label>
            </div>

            <div className="dialog-content-item">
              <label htmlFor="date">
                <input
                  type="date"
                  id="date"
                  defaultValue={dateIni.toISOString().split("T")[0]}
                />
              </label>
            </div>
            <div className="dialog-content-item">
              <label htmlFor="time">
                <input type="time" id="time" />
              </label>
            </div>
            <div className="dialog-content-item">
              <label htmlFor="description">
               <ArticleIcon/>
                <textarea id="description" placeholder="Descrição" ></textarea>
              </label>
            </div>
            <div className="dialog-content-buttons">
              <button className="btn-submit" type="submit">
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
