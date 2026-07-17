const fs = require('fs');

const patch = (file, search, replace) => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(search, replace);
  fs.writeFileSync(file, content);
};

patch('src/App.tsx', "import React from 'react';\n", "");
patch('src/core/auth/AuthContext.tsx', "import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';\nimport { User, onAuthStateChanged } from 'firebase/auth';", "import { createContext, useContext, useEffect, useState } from 'react';\nimport type { ReactNode } from 'react';\nimport { onAuthStateChanged } from 'firebase/auth';\nimport type { User } from 'firebase/auth';");
patch('src/core/errors/ErrorBoundary.tsx', "import React, { Component, ErrorInfo, ReactNode } from 'react';", "import { Component } from 'react';\nimport type { ErrorInfo, ReactNode } from 'react';");
patch('src/core/router/AppRouter.tsx', "import React from 'react';\n", "");
patch('src/core/theme/ThemeProvider.tsx', "import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';", "import { createContext, useContext, useEffect, useState } from 'react';\nimport type { ReactNode } from 'react';");

let authService = fs.readFileSync('src/services/auth.service.ts', 'utf8');
authService = authService.replace("  sendEmailVerification,\n  User,\n} from 'firebase/auth';", "  sendEmailVerification,\n} from 'firebase/auth';\nimport type { User } from 'firebase/auth';");
fs.writeFileSync('src/services/auth.service.ts', authService);

patch('src/shared/components/Button.tsx', "import React, { ButtonHTMLAttributes } from 'react';", "import type { ButtonHTMLAttributes } from 'react';");
patch('src/shared/components/Card.tsx', "import React, { HTMLAttributes } from 'react';", "import type { HTMLAttributes } from 'react';");
patch('src/shared/components/Input.tsx', "import React, { InputHTMLAttributes, forwardRef } from 'react';", "import { forwardRef } from 'react';\nimport type { InputHTMLAttributes } from 'react';");
