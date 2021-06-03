using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using PocketNewTestament.Application.Contracts;
using PocketNewTestament.Domain;
using PocketNewTestament.Persistence;
using PocketNewTestament.Persistence.Contracts;

namespace PocketNewTestament.Application
{
  public class InfoService : IInfoService
  {
    private readonly IGeralPersist _geralPersist;

    public InfoService(IGeralPersist geralPersist)
    {
      _geralPersist = geralPersist;
    }

    public async Task<Info> GetInfo()
    {
      return await _geralPersist.GetInfo();
    }

    public async Task<Info> Update(Info model)
    {
      try
      {
        var oldResult = await _geralPersist.GetInfo();
        model.UpdatedAt = DateTime.Now;
        _geralPersist.Update<Info>(model);
        if (await _geralPersist.SaveChangesAsync())
        {
          return await _geralPersist.GetInfo();
        }
        return null;
      }
      catch (Exception e)
      {
        throw new Exception(e.Message);
      }
    }

    public async Task<bool> UpdateAutomatic()
    {
      try
      {
        var resultForUpdate = await _geralPersist.GetInfo();
        resultForUpdate.UpdatedAt = DateTime.Now;
        var countBiblias = await _geralPersist.GetAll();
        resultForUpdate.RegistersCount = countBiblias.Count;
        FileInfo fileInfo = new FileInfo(Directory.GetCurrentDirectory() + "\\PocketNewTestament.db");
        resultForUpdate.DatabaseSize = fileInfo.Length.ToString();
        _geralPersist.Update<Info>(resultForUpdate);
        if (await _geralPersist.SaveChangesAsync())
        {
          return true;
        }
        return false;
      }
      catch (Exception e)
      {
        throw new Exception(e.Message);
      }
    }
  }
}
