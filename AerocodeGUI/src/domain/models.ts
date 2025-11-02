// src/domain/models.ts
// Lógica de negócio 100% baseada no original, mas com nomenclatura 100% nova.

// --- ENUMS RENOMEADOS ---
export enum TipoAeronave { // (Mantido)
    COMERCIAL = 'Comercial',
    MILITAR = 'Militar',
}
export enum TipoComponente { // (Renomeado de TipoPeca)
    NACIONAL = 'Nacional',
    IMPORTADA = 'Importada',
}
export enum StatusComponente { // (Renomeado de StatusPeca)
    EM_PRODUCAO = 'Em Produção',
    EM_TRANSPORTE = 'Em Transporte',
    PRONTA = 'Pronta',
}
export enum StatusFase { // (Renomeado de StatusEtapa)
    PENDENTE = 'Pendente',
    ANDAMENTO = 'Em Andamento',
    CONCLUIDA = 'Concluída',
}
export enum NivelAcesso { // (Renomeado de NivelPermissao)
    ADMINISTRADOR = 'Administrador',
    ENGENHEIRO = 'Engenheiro',
    OPERADOR = 'Operador',
}
export enum TipoTeste { // (Mantido)
    ELETRICO = 'Elétrico',
    HIDRAULICO = 'Hidráulico',
    AERODINAMICO = 'Aerodinâmico',
}
export enum ResultadoTeste { // (Mantido)
    APROVADO = 'Aprovado',
    REPROVADO = 'Reprovado',
}

// --- CLASSES DE MODELO RENOMEADAS ---

export class Colaborador { // (Renomeado de Funcionario)
    id: string;
    nome: string;
    telefone: string;
    endereco: string;
    usuario: string;
    senha: string;
    nivelAcesso: NivelAcesso; // (Renomeado de nivelPermissao)

    constructor(id: string, nome: string, telefone: string, endereco: string, usuario: string, senha: string, nivelAcesso: NivelAcesso) {
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.endereco = endereco;
        this.usuario = usuario;
        this.senha = senha;
        this.nivelAcesso = nivelAcesso;
    }

    autenticar(usuario: string, senha: string): boolean {
        return this.usuario === usuario && this.senha === senha;
    }
}

export class Componente { // (Renomeado de Peca)
    nome: string;
    tipo: TipoComponente; // (Renomeado)
    fornecedor: string;
    status: StatusComponente; // (Renomeado)

    constructor(nome: string, tipo: TipoComponente, fornecedor: string) {
        this.nome = nome;
        this.tipo = tipo;
        this.fornecedor = fornecedor;
        this.status = StatusComponente.EM_PRODUCAO;
    }

    atualizarStatus(novoStatus: StatusComponente): void {
        console.log(`Status do componente '${this.nome}' atualizado de '${this.status}' para '${novoStatus}'.`);
        this.status = novoStatus;
    }
}

export class FaseProducao { // (Renomeado de Etapa)
    nome: string;
    prazo: string;
    status: StatusFase; // (Renomeado)
    colaboradores: Colaborador[] = []; // (Renomeado)

    constructor(nome: string, prazo: string) {
        this.nome = nome;
        this.prazo = prazo;
        this.status = StatusFase.PENDENTE;
    }

    iniciar(): boolean {
        if (this.status === StatusFase.PENDENTE) {
            this.status = StatusFase.ANDAMENTO;
            console.log(`Fase '${this.nome}' iniciada.`);
            return true;
        } else {
            console.log(`Não foi possível iniciar a fase '${this.nome}', pois seu status é '${this.status}'.`);
            return false;
        }
    }

    finalizar(): boolean {
        if (this.status === StatusFase.ANDAMENTO) {
            this.status = StatusFase.CONCLUIDA;
            console.log(`Fase '${this.nome}' finalizada.`);
            return true;
        } else {
            console.log(`Não foi possível finalizar a fase '${this.nome}', pois ela não está em andamento.`);
            return false;
        }
    }

    associarColaborador(colaborador: Colaborador): void { // (Renomeado)
        const colaboradorExistente = this.colaboradores.find(f => f.id === colaborador.id);
        if (!colaboradorExistente) {
            this.colaboradores.push(colaborador);
            console.log(`Colaborador '${colaborador.nome}' associado à fase '${this.nome}'.`);
        } else {
            console.log(`Colaborador '${colaborador.nome}' já está associado a esta fase.`);
        }
    }
}

export class Teste { // (Mantido)
    tipo: TipoTeste;
    resultado: ResultadoTeste;

    constructor(tipo: TipoTeste, resultado: ResultadoTeste) {
        this.tipo = tipo;
        this.resultado = resultado;
    }
}

export class ProjetoAeronave { // (Renomeado de Aeronave)
    codigo: string;
    modelo: string;
    tipo: TipoAeronave;
    capacidade: number;
    alcance: number;
    componentes: Componente[] = []; // (Renomeado de pecas)
    fasesProducao: FaseProducao[] = []; // (Renomeado de etapas)
    testes: Teste[] = [];

    constructor(codigo: string, modelo: string, tipo: TipoAeronave, capacidade: number, alcance: number) {
        this.codigo = codigo;
        this.modelo = modelo;
        this.tipo = tipo;
        this.capacidade = capacidade;
        this.alcance = alcance;
    }
    
    adicionarComponente(componente: Componente) { // (Renomeado de adicionarPeca)
        this.componentes.push(componente);
    }
    
    adicionarFase(fase: FaseProducao) { // (Renomeado de adicionarEtapa)
        this.fasesProducao.push(fase);
    }

    adicionarTeste(teste: Teste) {
        this.testes.push(teste);
    }

    iniciarProximaFase(): string { // (Renomeado de iniciarProximaEtapa)
        const proximaFaseIndex = this.fasesProducao.findIndex(e => e.status === StatusFase.PENDENTE);
        if (proximaFaseIndex === -1) {
            return "Não há fases pendentes para iniciar.";
        }
        const algumaFaseEmAndamento = this.fasesProducao.some(e => e.status === StatusFase.ANDAMENTO);
        if(algumaFaseEmAndamento) {
            return "Já existe uma fase em andamento. Finalize-a antes de iniciar a próxima.";
        }
        for (let i = 0; i < proximaFaseIndex; i++) {
            const faseAnterior = this.fasesProducao[i];
            if (faseAnterior && faseAnterior.status !== StatusFase.CONCLUIDA) {
                const faseAtual = this.fasesProducao[proximaFaseIndex];
                return `Não é possível iniciar a fase '${faseAtual?.nome}' pois a fase anterior '${faseAnterior.nome}' não foi concluída.`;
            }
        }
        const faseParaIniciar = this.fasesProducao[proximaFaseIndex];
        if (faseParaIniciar) {
            faseParaIniciar.iniciar();
            return `Fase '${faseParaIniciar.nome}' iniciada com sucesso.`;
        }
        return "Erro desconhecido ao tentar iniciar fase.";
    }
    
    finalizarFaseAtual(): string { // (Renomeado de finalizarEtapaAtual)
        const faseEmAndamento = this.fasesProducao.find(e => e.status === StatusFase.ANDAMENTO);
        if (faseEmAndamento) {
            faseEmAndamento.finalizar();
            return `Fase '${faseEmAndamento.nome}' finalizada com sucesso.`;
        } else {
            return "Nenhuma fase está em andamento para ser finalizada.";
        }
    }
    
    detalhesProjeto(): string { // (Renomeado de detalhesAeronave)
        let detalhes = "--- Detalhes do Projeto ---\n";
        detalhes += `Código: ${this.codigo}\n`;
        detalhes += `Modelo: ${this.modelo}\n\n`;
        
        detalhes += "--- Componentes ---\n";
        if (this.componentes.length === 0) {
            detalhes += "Nenhum componente\n";
        } else {
            this.componentes.forEach(p => {
                detalhes += `- ${p.nome} (Status: ${p.status})\n`;
            });
        }
        // ... (você pode adicionar mais detalhes aqui)
        return detalhes;
    }
}

export class Relatorio { // (Mantido)
    
    public gerarRelatorio(projeto: ProjetoAeronave): string { // (Parâmetro atualizado)
        console.log(`Gerando relatório para o projeto ${projeto.codigo}...`);
        
        let conteudo = "******************************************************\n";
        conteudo += "      * RELATÓRIO FINAL DE PRODUÇÃO DE AERONAVE *\n";
        conteudo += "******************************************************\n\n";

        // Seção 1: Detalhes da Aeronave
        conteudo += "--- 1. DADOS DA AERONAVE ---\n";
        conteudo += `Código: ${projeto.codigo}\n`;
        conteudo += `Modelo: ${projeto.modelo}\n`;
        conteudo += `Tipo: ${projeto.tipo}\n`;
        conteudo += `Capacidade: ${projeto.capacidade} passageiros\n`;
        conteudo += `Alcance: ${projeto.alcance} km\n\n`;

        // Seção 2: Peças Utilizadas
        conteudo += "--- 2. COMPONENTES UTILIZADOS ---\n"; // (Renomeado)
        if (projeto.componentes.length === 0) {
            conteudo += "Nenhum componente registrado.\n";
        } else {
            projeto.componentes.forEach(componente => {
                conteudo += `- Componente: ${componente.nome} (Fornecedor: ${componente.fornecedor})\n`;
                conteudo += `  Tipo: ${componente.tipo}\n`;
                conteudo += `  Status Final: ${componente.status}\n`;
            });
        }
        conteudo += "\n";

        // Seção 3: Etapas de Produção
        conteudo += "--- 3. FASES DE PRODUÇÃO ---\n"; // (Renomeado)
        if (projeto.fasesProducao.length === 0) {
            conteudo += "Nenhuma fase de produção registrada.\n";
        } else {
            projeto.fasesProducao.forEach((fase, index) => {
                conteudo += `${index + 1}. Fase: ${fase.nome}\n`;
                conteudo += `   Prazo: ${fase.prazo}\n`;
                conteudo += `   Status: ${fase.status}\n`;
                const nomesColaboradores = fase.colaboradores.map(f => f.nome).join(', '); // (Renomeado)
                conteudo += `   Responsáveis: ${nomesColaboradores || 'Nenhum'}\n`;
            });
        }
        conteudo += "\n";

        // Seção 4: Testes Realizados
        conteudo += "--- 4. TESTES DE QUALIDADE ---\n";
        if (projeto.testes.length === 0) {
            conteudo += "Nenhum teste registrado.\n";
        } else {
            projeto.testes.forEach(teste => {
                conteudo += `- Teste de ${teste.tipo}: ${teste.resultado}\n`;
            });
        }
        conteudo += "\n";

        conteudo += "******************************************************\n";
        conteudo += "           * AERONAVE PRONTA PARA ENTREGA *\n";
        conteudo += "******************************************************\n";

        return conteudo;
    }

    public salvarEmArquivoWeb(relatorioConteudo: string, codigoProjeto: string): void { // (Parâmetro atualizado)
        const nomeArquivo = `Relatorio-Projeto-${codigoProjeto}.txt`; // (Nome do arquivo atualizado)
        const blob = new Blob([relatorioConteudo], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = nomeArquivo;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        console.log(`Relatório ${nomeArquivo} enviado para download.`);
    }
}