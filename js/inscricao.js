// Inicializa o cliente Supabase corretamente
const SUPABASE_URL = "https://nahxbuzzmatdzrqaacrf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5haHhidXp6bWF0ZHpycWFhY3JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0NDE4NTQsImV4cCI6MjA3NTAxNzg1NH0.wMiiiZZ3ZWxRy_RD_bRjHU4ck9tFpi1Ey8CPwFG18tQ";
const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const selectAtividade = document.getElementById('atividade');

async function carregarAtividades() {
  const { data, error } = await client
  .from('tbatividades')
  .select('id, titulo, data')
  .order('data', {ascending: true});

 

    if (error) {
        console.error('Erro ao carregar atividades:', error.message);
        selectAtividade.innerHTML = '<option value="">Erro ao carregar atividades</option>';
        return;
    }

    const hoje = new Date();
    const atividadesFuturas = data.filter(ev => new Date(ev.data) >= hoje);

    if (atividadesFuturas.length === 0) {
      selectAtividade.innerHTML = '<option value="">Nenhuma atividade disponivel</option>';
      return;
    }

    selectAtividade.innerHTML = '<option value="">Selecione uma atividade</option>';
    atividadesFuturas.forEach(ev => {
        const opcao = document.createElement('option');
        const dataFormatada = new Date(ev.data).toLocaleDateString('pt-br',{
            day: '2-digit',
            month: '2-digit'
        });
        opcao.value = ev.id;
        opcao.textContent = `${ev.titulo} - ${dataFormatada}`;
        selectAtividade.appendChild(opcao);
    });

    const params = new URLSearchParams(window.location.search);
    const eventoId = params.get('id');
    if (eventoId) selectAtividade.value = eventoId;
}

carregarAtividades();

document.getElementById('formInscricao').addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').valeu.trim();
    const atividadeId = selectAtividade.value;

    if (!atividadeId) {
        alert('Selecione uma atividade antes de enviar');
        return;
    }

    alert(`Inscrição enviada!\nNome: ${nome}\nE-mail: ${email}`);
    // logica integ
});