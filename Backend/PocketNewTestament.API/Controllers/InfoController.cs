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
    public class InfoController : ControllerBase
    {
        private readonly IInfoService _infoService;
        private readonly IWebHostEnvironment _hostingEnvironment;
        
        public InfoController(IInfoService infoService, IWebHostEnvironment hostingEnvironment)
        {
            _infoService = infoService;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await _infoService.GetInfo();
                if(result == null) return NotFound("Nenhum Registro Encontrado");
                return Ok(result);
            }
            catch (Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar dados. Erro: {e.Message}");
            }
        }
        
        [HttpPut]
        public async Task<IActionResult> Update(Info model)
        {

            if (!_hostingEnvironment.EnvironmentName.Equals("Development")){
                return this.StatusCode(StatusCodes.Status401Unauthorized, $"Você não tem autorização para realizar essa ação!");
            }
            
            try
            {
                var result = await _infoService.Update(model);
                if(result == null) return BadRequest("Erro ao tentar atualizar dados.");
                return Ok(result);
            }
            catch (Exception e)
            {
                return this.StatusCode(StatusCodes.Status401Unauthorized, $"Você não tem autorização para realizar essa ação!");
            }
        }
        
    }
}
