using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAgil.Domain;
using ProAgil.Repository;

namespace ProAgil.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase 
    {
        private readonly IProAgilRepository _repos;
        // injeção de dependência
        public EventoController(IProAgilRepository repos)
        {
            _repos = repos;
          
        }  

          // GET api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result =  await _repos.GetAllEventosAsyn(true);
                return Ok( result);
            }
            catch (System.Exception)
            {
                return this.StatusCode( StatusCodes.Status500InternalServerError,"Falha no banco de dados" );
            }
            
        }
          // GET api/values
        [HttpGet("{EventoId}")]
        public async Task<IActionResult> Get(int EventoId)
        {
            try
            {
                var result =  await _repos.GetAllEventoAsynById(EventoId, true);
                return Ok( result);
            }
            catch (System.Exception)
            {
                return this.StatusCode( StatusCodes.Status500InternalServerError,"Falha no banco de dados" );
            }
            
        }

           // GET api/values
        [HttpGet("getByTema{Tema}")]
        public async Task<IActionResult> Get(string Tema)
        {
            try
            {
                var result =  await _repos.GetAllEventosAsynByTema( Tema, true);
                return Ok( result);
            }
            catch (System.Exception)
            {
                return this.StatusCode( StatusCodes.Status500InternalServerError,"Falha no banco de dados" );
            }
            
        }


        [HttpPost]
        public async Task<IActionResult> Post(Evento model)
        {
            try
            {
                _repos.Add(model);
                if ( await _repos.SaveChangesAsync() ){
                    return Created($"api/evento/{model.Id}", model );
                }
                
            }
            catch (System.Exception)
            {
                return this.StatusCode( StatusCodes.Status500InternalServerError,"Falha no banco de dados" );
            }
            return BadRequest();
            
        }

        [HttpPut("{EventoId}")]
        public async Task<IActionResult> Put(int EventoId, Evento model)
        {
            try
            {
                var evento = await _repos.GetAllEventoAsynById( EventoId, false);
                if ( evento == null) return NotFound();

                _repos.Update(model);
                if ( await _repos.SaveChangesAsync() ){
                    return Created($"api/evento/{model.Id}", model );
                }
                
            }
            catch (System.Exception)
            {
                return this.StatusCode( StatusCodes.Status500InternalServerError,"Falha no banco de dados" );
            }
            return BadRequest();
            
        }     

        [HttpDelete("{EventoId}")]
        public async Task<IActionResult> Delete(int EventoId)
        {
            try
            {
                var evento = await _repos.GetAllEventoAsynById( EventoId, false);
                if ( evento == null) return NotFound();

                _repos.Delete(evento);
                if ( await _repos.SaveChangesAsync() ){
                    return Ok();
                }
                
            }
            catch (System.Exception)
            {
                return this.StatusCode( StatusCodes.Status500InternalServerError,"Falha no banco de dados" );
            }
            return BadRequest();
            
        }            

    }

}