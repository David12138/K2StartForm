﻿using KStar.Platform.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KStar.Form.Domain.Service
{
    public interface IDemoServier : IService
    {
        List<MD_User> test();

    }
}