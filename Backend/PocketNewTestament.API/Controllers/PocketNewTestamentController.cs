using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using PocketNewTestament.Application;
using PocketNewTestament.Application.Contracts;
using PocketNewTestament.Domain;

namespace PocketNewTestament.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PocketNewTestamentController : ControllerBase
    {
        private readonly IBibliaService _bibliaService;
        private readonly IWebHostEnvironment _hostingEnvironment;
        
        public PocketNewTestamentController(IBibliaService bibliaService, IWebHostEnvironment hostingEnvironment)
        {
            _bibliaService = bibliaService;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await _bibliaService.GetAll();
                if(results == null) return NotFound("Nenhum Registro Encontrado");
                return Ok(results);
            }
            catch (Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar dados. Erro: {e.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(Biblia model)
        {
            try
            {
                var result = await _bibliaService.Add(model);
                if(result == null) return BadRequest("Erro ao tentar adicionar dados.");
                return Ok(result);
            }
            catch (Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao adicionar dados. Erro: {e.Message}");
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(Biblia model)
        {

            if (!_hostingEnvironment.EnvironmentName.Equals("Development")){
                return this.StatusCode(StatusCodes.Status401Unauthorized, $"Você não tem autorização para realizar essa ação!");
            }
            
            try
            {
                var result = await _bibliaService.Update(model);
                if(result == null) return BadRequest("Erro ao tentar atualizar dados.");
                return Ok(result);
            }
            catch (Exception e)
            {
                return this.StatusCode(StatusCodes.Status401Unauthorized, $"Você não tem autorização para realizar essa ação!");
            }
        }
        
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {

            if (!_hostingEnvironment.EnvironmentName.Equals("Development")){
                return this.StatusCode(StatusCodes.Status401Unauthorized, $"Você não tem autorização para realizar essa ação!");
            }
            
            try
            {
                await _bibliaService.Delete(id);
                return Ok();
            }
            catch (Exception e)
            {
                return this.StatusCode(StatusCodes.Status401Unauthorized, $"Você não tem autorização para realizar essa ação!");
            }
        }
    }
}
