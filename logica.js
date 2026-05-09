
  const BACKEND_URL = 'https://vigilant-computing-machine-7vv9g5pwgw463r44j-8080.app.github.dev/';

    function getToken() {
      const params = new URLSearchParams(window.location.search);
      return params.get('token');
    }
function getID_usuario(){
  const params = new URLSearchParams(window.location.search);
      return params.get('id_usuario');
}

    async function redefinirSenha() {
      const novaSenha = document.getElementById('novaSenha').value;
      const confirmarSenha = document.getElementById('confirmarSenha').value;
      const btn = document.getElementById('btnSubmit');

      // Reset visual
      document.getElementById('novaSenha').classList.remove('error');
      document.getElementById('confirmarSenha').classList.remove('error');
      document.getElementById('msgErro').style.display = 'none';

      // Validações
      if (!novaSenha || novaSenha.length < 8) {
        mostrarErro('A senha deve ter pelo menos 8 caracteres.');
        document.getElementById('novaSenha').classList.add('error');
        return;
      }

      if (novaSenha !== confirmarSenha) {
        mostrarErro('As senhas não coincidem.');
        document.getElementById('confirmarSenha').classList.add('error');
        return;
      }

      const token = getToken();
      if (!token) {
        mostrarErro('Link inválido ou expirado. Solicita um novo link no app.');
        return;
      }
      

      const id_usuario = getID_usuario()
      if (!token) {
        mostrarErro('não encontramos seu ID. Solicita um novo link no app.');
        return;
      }

      // Loading
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span> A actualizar...';

      try {
        const resposta = await fetch(`${BACKEND_URL}/redefinir_senha`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, novaSenha, id_usuario }),
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
          mostrarErro(dados.error || 'Erro ao redefinir senha. Tenta novamente.');
          btn.disabled = false;
          btn.innerHTML = 'Actualizar Senha';
          return;
        }

        // Sucesso
        document.getElementById('formulario').style.display = 'none';
        document.getElementById('msgSucesso').style.display = 'flex';

      } catch (err) {
        mostrarErro('Erro de ligação. Verifica a tua internet e tenta novamente.');
        btn.disabled = false;
        btn.innerHTML = 'Actualizar Senha';
      }
    }

    function mostrarErro(texto) {
      document.getElementById('textoErro').textContent = texto;
      document.getElementById('msgErro').style.display = 'flex';
    }
