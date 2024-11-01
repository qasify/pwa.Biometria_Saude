const CACHE_NAME = 'v1.7'; // Incrementar a versão conforme necessário


document.addEventListener('DOMContentLoaded', function () {
    const cpfInput = document.getElementById('cpf');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');

    let userData = {}; // Para armazenar os dados do usuário e o token

    cpfInput.addEventListener('input', function () {
        let value = cpfInput.value.replace(/\D/g, '');
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        if (value.length <= 11) {
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        }
        cpfInput.value = value;
    });

    phoneInput.addEventListener('input', function () {
        let value = phoneInput.value.replace(/\D/g, '');
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        if (value.length <= 11) {
            value = value.replace(/(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
        }
        phoneInput.value = value;
    });

    document.getElementById('authForm').addEventListener('submit', function (e) {
        e.preventDefault();
        
        const cpf = cpfInput.value.replace(/\D/g, '');
        const birthdate = formatDateToISO(document.getElementById('birthdate').value);
        const phone = phoneInput.value.replace(/\D/g, '');
        const email = emailInput.value;

        if (!validateCPF(cpf)) {
            alert('CPF inválido.');
            return;
        }

        if (!validatePhone(phone)) {
            alert('Número de celular inválido.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Email inválido.');
            return;
        }

        axios.post('https://api.biometria.automais.tec.br/api/Autenticacao/Simples', {
            cpf: cpf,
            dataDeNascimento: birthdate
        })
        .then(response => {
            const camelCaseData = keysToCamelCase(response.data);
            console.log(camelCaseData);

            if (camelCaseData.nome) {
                if (confirm(`Olá ${camelCaseData.nome}, você confirma que é você mesmo?`)) {
                    userData = { cpf, birthdate, phone, email, token: camelCaseData.token, id: camelCaseData.id }; // Armazena os dados do usuário e o token
                    openCamera();
                }
            } else {
                alert('Dados não encontrados.');
            }
        })
        .catch(error => console.error('Erro:', error));
    });

    function openCamera() {
        const video = document.createElement('video');
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const buttonContainer = document.createElement('div');
        const fotoBtn = document.createElement('button');
        const cancelarBtn = document.createElement('button');
    
        video.style.width = '100%';
        video.style.height = 'calc(100vh - 50px)';
        video.style.transform = 'scaleX(-1)'; // Inverte o vídeo ao vivo
    
        buttonContainer.style.position = 'absolute';
        buttonContainer.style.bottom = '0';
        buttonContainer.style.width = '100%';
        buttonContainer.style.display = 'flex';
    
        fotoBtn.textContent = 'FOTO';
        fotoBtn.style.flex = '1';
        fotoBtn.style.padding = '20px';
        fotoBtn.style.backgroundColor = '#007BFF';
        fotoBtn.style.color = '#fff';
        fotoBtn.style.border = 'none';
        fotoBtn.style.cursor = 'pointer';
    
        cancelarBtn.textContent = 'CANCELAR';
        cancelarBtn.style.flex = '1';
        cancelarBtn.style.padding = '20px';
        cancelarBtn.style.backgroundColor = '#FF0000';
        cancelarBtn.style.color = '#fff';
        cancelarBtn.style.border = 'none';
        cancelarBtn.style.cursor = 'pointer';
    
        buttonContainer.appendChild(fotoBtn);
        buttonContainer.appendChild(cancelarBtn);
    
        document.body.innerHTML = '';
        document.body.appendChild(video);
        document.body.appendChild(buttonContainer);
    
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
                video.play();
            })
            .catch(error => console.error('Erro ao acessar a câmera:', error));
    
        cancelarBtn.addEventListener('click', function () {
            video.pause();
            video.srcObject.getTracks().forEach(track => track.stop());
            document.location.reload();
        });
    
        fotoBtn.addEventListener('click', function () {
            // Define o tamanho do canvas para as dimensões do vídeo
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
    
            // Desenha o frame do vídeo no canvas sem inverter (já invertido no CSS)
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
            // Redimensiona e recorta a imagem para 512x512 sem distorção
            const croppedCanvas = document.createElement('canvas');
            const croppedContext = croppedCanvas.getContext('2d');
            croppedCanvas.width = 512;
            croppedCanvas.height = 512;
    
            const sideLength = Math.min(canvas.width, canvas.height);
            const sx = (canvas.width - sideLength) / 2;
            const sy = (canvas.height - sideLength) / 2;
    
            croppedContext.drawImage(canvas, sx, sy, sideLength, sideLength, 0, 0, 512, 512);
    
            const selfie = croppedCanvas.toDataURL('image/png');
            video.pause();
            video.srcObject.getTracks().forEach(track => track.stop());
            showConfirmationButtons(selfie);
        });
    }   

    function showConfirmationButtons(selfie) {
        const img = document.createElement('img');
        img.src = selfie;
        img.style.width = '100%';

        const buttonContainer = document.createElement('div');
        const confirmarBtn = document.createElement('button');
        const tentarNovamenteBtn = document.createElement('button');
        const cancelarBtn = document.createElement('button');

        buttonContainer.style.position = 'absolute';
        buttonContainer.style.bottom = '0';
        buttonContainer.style.width = '100%';
        buttonContainer.style.display = 'flex';

        confirmarBtn.textContent = 'CONFIRMAR';
        confirmarBtn.style.flex = '1';
        confirmarBtn.style.padding = '20px';
        confirmarBtn.style.backgroundColor = '#007BFF';
        confirmarBtn.style.color = '#fff';
        confirmarBtn.style.border = 'none';
        confirmarBtn.style.cursor = 'pointer';

        tentarNovamenteBtn.textContent = 'TENTAR NOVAMENTE';
        tentarNovamenteBtn.style.flex = '1';
        tentarNovamenteBtn.style.padding = '20px';
        tentarNovamenteBtn.style.backgroundColor = '#FFA500';
        tentarNovamenteBtn.style.color = '#fff';
        tentarNovamenteBtn.style.border = 'none';
        tentarNovamenteBtn.style.cursor = 'pointer';

        cancelarBtn.textContent = 'CANCELAR';
        cancelarBtn.style.flex = '1';
        cancelarBtn.style.padding = '20px';
        cancelarBtn.style.backgroundColor = '#FF0000';
        cancelarBtn.style.color = '#fff';
        cancelarBtn.style.border = 'none';
        cancelarBtn.style.cursor = 'pointer';

        buttonContainer.appendChild(confirmarBtn);
        buttonContainer.appendChild(tentarNovamenteBtn);
        buttonContainer.appendChild(cancelarBtn);

        document.body.innerHTML = '';
        document.body.appendChild(img);
        document.body.appendChild(buttonContainer);

        cancelarBtn.addEventListener('click', function () {
            document.location.reload();
        });

        tentarNovamenteBtn.addEventListener('click', function () {
            openCamera();
        });

        confirmarBtn.addEventListener('click', function () {
            axios.post('https://api.biometria.automais.tec.br/api/Funcionario/AtualizaFuncionario', {
                id: userData.id,
                cpf: userData.cpf,
                dataDeNascimento: userData.birthdate,
                phone: userData.phone,
                email: userData.email,
                foto: selfie.replace(/^data:image\/[a-zA-Z]+;base64,/, ''),
                token: userData.token
            })
            .then(response => {
                alert('Foto atualizada com sucesso!');
                document.location.reload();
            })
            .catch(error => console.error('Erro:', error));
        });
    }

    function validateCPF(cpf) {
        if (cpf.length !== 11) return false;
        let sum = 0;
        let remainder;

        if (cpf === "00000000000" || cpf === "11111111111" || cpf === "22222222222" || 
            cpf === "33333333333" || cpf === "44444444444" || cpf === "55555555555" || 
            cpf === "66666666666" || cpf === "77777777777" || cpf === "88888888888" || 
            cpf === "99999999999") return false;

        for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        remainder = (sum * 10) % 11;

        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        remainder = (sum * 10) % 11;

        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11))) return false;
        return true;
    }

    function validatePhone(phone) {
        return phone.length === 11;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function formatDateToISO(date) {
        const isoString = new Date(date).toISOString();
        return isoString;
    }

    function toCamelCase(str) {
        return str.replace(/([-_][a-z])/gi, (match) => {
            return match.toUpperCase().replace('-', '').replace('_', '');
        });
    }

    function keysToCamelCase(obj) {
        if (Array.isArray(obj)) {
            return obj.map(v => keysToCamelCase(v));
        } else if (obj !== null && obj.constructor === Object) {
            return Object.keys(obj).reduce((result, key) => {
                result[toCamelCase(key)] = keysToCamelCase(obj[key]);
                return result;
            }, {});
        }
        return obj;
    }
});
// Registra o service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('Service Worker registrado com sucesso:', registration);
  
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // Novo service worker está ativo
              console.log('Novo Service Worker disponível');
              if (confirm('Uma nova versão está disponível. Deseja atualizar?')) {
                window.location.reload();
              }
            } else {
              console.log('Conteúdo cacheado pela primeira vez');
            }
          }
        };
      };
  
      // Verifica a conexão com a internet e força a atualização do cache
      if (navigator.onLine) {
        registration.update();
        caches.keys().then(cacheNames => {
          cacheNames.forEach(cacheName => {
            if (cacheName !== CACHE_NAME) {
              caches.delete(cacheName);
            }
          });
        });
      }
  
      // Verifica atualizações periodicamente
      setInterval(() => {
        registration.update();
      }, 1000 * 60 * 60); // Verifica a cada hora
  
    }).catch(error => {
      console.log('Falha ao registrar o Service Worker:', error);
    });
  }
  
  // Detecta mudanças na conexão de rede
  window.addEventListener('online', () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.update();
        caches.keys().then(cacheNames => {
          cacheNames.forEach(cacheName => {
            if (cacheName !== CACHE_NAME) {
              caches.delete(cacheName);
            }
          });
        });
      });
    }
  });