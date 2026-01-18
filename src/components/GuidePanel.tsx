
import React, { useState } from 'react';
import { CRITERIA, Member, Proposal } from '../types';
import { BookOpen, UserCheck, BarChart3, Sparkles, Settings, Code2, Database, Layers, CheckCircle2, ChevronDown, ChevronUp, Cpu, ShieldCheck, Cloud, Server, Globe, ArrowRight, LayoutList, Target, User, Flag, Shield, Key, FileText, Printer, Copy, AlertTriangle, Lock, Zap, MousePointerClick } from 'lucide-react';

interface GuidePanelProps {
  members: Member[];
  proposals: Proposal[];
}

const GuidePanel: React.FC<GuidePanelProps> = ({ members, proposals }) => {
  const [openSection, setOpenSection] = useState<string | null>('dns_setup'); // Focando no DNS

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const SectionHeader = ({ id, title, icon: Icon, colorClass }: any) => (
    <button 
      onClick={() => toggleSection(id)}
      className={`w-full flex items-center justify-between p-5 rounded-xl border transition-all duration-200 ${openSection === id ? 'bg-white dark:bg-slate-800 border-indigo-500 ring-2 ring-indigo-500/10 shadow-lg' : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800'}`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colorClass} bg-opacity-10 text-current`}>
          <Icon size={24} />
        </div>
        <span className="font-bold text-lg text-slate-800 dark:text-white">{title}</span>
      </div>
      {openSection === id ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
    </button>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 animate-fade-in">
      
      {/* Hero Section */}
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full mb-4">
          <Cloud size={32} />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Dossiê de Arquitetura AWS</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Estratégia de Migração para Cloud Native Serverless ("Portfólio na Nuvem")
        </p>
      </div>

      <div className="space-y-4">

        {/* PASSO 1: DNS (ROUTE 53 + REGISTRO.BR) */}
        <SectionHeader id="dns_setup" title="1. Configurar Domínio (Route 53 + Registro.br)" icon={Globe} colorClass="text-blue-600 bg-blue-600" />
        {openSection === 'dns_setup' && (
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-6 animate-fade-in-down">
             
             <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800 mb-4">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                   <strong>Objetivo:</strong> Dizer ao Registro.br que quem manda no seu domínio agora é a AWS.
                </p>
             </div>

             <div className="space-y-6 relative">
                {/* Step A */}
                <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-sm">A</div>
                        <div className="h-full w-0.5 bg-slate-200 dark:bg-slate-700 my-1"></div>
                    </div>
                    <div className="pb-6">
                        <h4 className="font-bold text-slate-800 dark:text-white">Na AWS: Criar Zona Hospedada</h4>
                        <ol className="list-decimal list-inside text-sm text-slate-600 dark:text-slate-400 mt-2 space-y-1">
                            <li>Pesquise por <strong>Route 53</strong> na AWS.</li>
                            <li>Clique em <strong>Zonas hospedadas</strong> (Hosted zones).</li>
                            <li>Clique em <strong>Criar zona hospedada</strong>.</li>
                            <li>Em "Nome de domínio", digite: <code>edivaldojuniordev.com.br</code></li>
                            <li>Role até o fim e clique em <strong>Criar zona hospedada</strong>.</li>
                        </ol>
                    </div>
                </div>

                {/* Step B */}
                <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">B</div>
                        <div className="h-full w-0.5 bg-slate-200 dark:bg-slate-700 my-1"></div>
                    </div>
                    <div className="pb-6">
                        <h4 className="font-bold text-slate-800 dark:text-white">Na AWS: Copiar os Servidores (NS)</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                            Ao criar a zona, aparecerá um registro do tipo <strong>NS</strong> com 4 linhas parecidas com:
                        </p>
                        <div className="bg-slate-900 text-slate-300 p-3 rounded mt-2 font-mono text-xs">
                            ns-123.awsdns-45.com<br/>
                            ns-678.awsdns-12.net<br/>
                            ns-xxx.awsdns-yy.org<br/>
                            ns-zzz.awsdns-ww.co.uk
                        </div>
                        <p className="text-xs text-red-500 mt-2 font-bold">⚠️ COPIE ESSES 4 ENDEREÇOS (sem o ponto final, se tiver).</p>
                    </div>
                </div>

                {/* Step C */}
                <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">C</div>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-white">No Registro.br: Alterar DNS</h4>
                        <ol className="list-decimal list-inside text-sm text-slate-600 dark:text-slate-400 mt-2 space-y-1">
                            <li>Acesse seu painel no <strong>Registro.br</strong>.</li>
                            <li>Clique no domínio <code>edivaldojuniordev.com.br</code>.</li>
                            <li>Role até a seção <strong>DNS</strong> e clique em <strong>Alterar Servidores DNS</strong>.</li>
                            <li>Cole os 4 endereços da AWS nos campos (Master, Slave 1, etc).</li>
                            <li>Clique em <strong>Salvar Alterações</strong>.</li>
                        </ol>
                        <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 text-xs rounded border border-yellow-200">
                            Isso pode levar de 30 min a 2 horas para propagar. Prossiga para o passo 2 enquanto isso.
                        </div>
                    </div>
                </div>
             </div>
          </div>
        )}

        {/* PASSO 2: CERTIFICADO SSL (ACM) */}
        <SectionHeader id="acm_setup" title="2. Criar Certificado Seguro (HTTPS)" icon={Lock} colorClass="text-emerald-600 bg-emerald-600" />
        {openSection === 'acm_setup' && (
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-6 animate-fade-in-down">
             <div className="space-y-4">
                <h4 className="font-bold text-slate-800 dark:text-white">Como criar o cadeado de segurança:</h4>
                <ol className="list-decimal list-inside text-sm text-slate-600 dark:text-slate-400 space-y-3">
                    <li>Na AWS, pesquise por <strong>Certificate Manager</strong>.</li>
                    <li>
                        <span className="text-red-500 font-bold">⚠️ IMPORTANTE:</span> No topo direito da tela, verifique se a região está <strong>N. Virginia (us-east-1)</strong>. O CloudFront só aceita certificados feitos lá.
                    </li>
                    <li>Clique em <strong>Solicitar certificado</strong> (Request certificate) &rarr; Próximo.</li>
                    <li>Em "Nomes de domínio", adicione dois nomes:
                        <ul className="list-disc list-inside ml-6 mt-1 font-mono text-slate-800 dark:text-white">
                            <li>edivaldojuniordev.com.br</li>
                            <li>*.edivaldojuniordev.com.br</li>
                        </ul>
                    </li>
                    <li>Validação: Escolha <strong>Validação de DNS</strong>.</li>
                    <li>Clique em <strong>Solicitar</strong>.</li>
                    <li>
                        <strong>O PULO DO GATO:</strong> Atualize a página. Clique no ID do certificado (que estará "Pendente").
                        Procure o botão <strong>"Criar registros no Route 53"</strong>. Clique nele e confirme.
                        <br/>
                        <span className="text-xs text-slate-500 italic">Isso configura a validação automática. Em alguns minutos, o status mudará para "Emitido" (Issued).</span>
                    </li>
                </ol>
             </div>
          </div>
        )}

        {/* PASSO 3: CLOUDFRONT FINAL */}
        <SectionHeader id="cloudfront_final" title="3. CloudFront Final: Conectando Tudo" icon={Zap} colorClass="text-purple-600 bg-purple-600" />
        {openSection === 'cloudfront_final' && (
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-6 animate-fade-in-down">
             <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800 mb-4">
                <p className="text-sm text-purple-800 dark:text-purple-200">
                   Agora vamos criar o link <code>portfolioclouddev.edivaldojuniordev.com.br</code>.
                </p>
             </div>

             <div className="space-y-4">
                <h4 className="font-bold text-slate-800 dark:text-white">Configuração do CloudFront:</h4>
                <ol className="list-decimal list-inside text-sm text-slate-600 dark:text-slate-400 space-y-3">
                    <li>Vá ao <strong>CloudFront</strong> e clique em <strong>Create distribution</strong>.</li>
                    <li><strong>Origin domain:</strong> Escolha seu bucket S3. (Clique em "Use website endpoint" se aparecer o aviso).</li>
                    <li><strong>Viewer protocol policy:</strong> Redirect HTTP to HTTPS.</li>
                    <li><strong>Web Application Firewall (WAF):</strong> "Do not enable".</li>
                    <li>
                        <strong>Alternate domain name (CNAME):</strong> Clique em "Add item" e digite:
                        <div className="font-mono text-slate-800 dark:text-white font-bold ml-6 mt-1">
                            portfolioclouddev.edivaldojuniordev.com.br
                        </div>
                    </li>
                    <li>
                        <strong>Custom SSL certificate:</strong> Clique na caixa e selecione o certificado que você criou no passo anterior.
                    </li>
                    <li>Role até o fim e clique em <strong>Create distribution</strong>.</li>
                </ol>
             </div>

             <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-4">
                 <h4 className="font-bold text-slate-800 dark:text-white mb-2">Último Passo: Apontar o Subdomínio</h4>
                 <ol className="list-decimal list-inside text-sm text-slate-600 dark:text-slate-400 space-y-2">
                    <li>Volte ao <strong>Route 53</strong> e entre na sua zona hospedada.</li>
                    <li>Clique em <strong>Criar registro</strong> (Create record).</li>
                    <li><strong>Nome do registro:</strong> Digite <code>portfolioclouddev</code> (para formar o subdomínio).</li>
                    <li>Ative o botão <strong>Alias</strong>.</li>
                    <li>Em "Direcionar tráfego para":
                        <ul className="list-disc list-inside ml-6 text-xs">
                            <li>Alias para distribuição do CloudFront</li>
                            <li>Cole o domínio do CloudFront (d123...cloudfront.net) que acabou de ser criado.</li>
                        </ul>
                    </li>
                    <li>Clique em <strong>Criar registros</strong>.</li>
                 </ol>
                 <div className="mt-4 text-center">
                     <p className="text-emerald-600 font-bold">🎉 PRONTO! Em alguns minutos seu link oficial estará no ar com HTTPS.</p>
                 </div>
             </div>
          </div>
        )}

        {/* SECTION 5: MODELO DE PREENCHIMENTO */}
        <SectionHeader id="template" title="5. Modelo de Documentação & Relatório" icon={FileText} colorClass="text-pink-600 bg-pink-600" />
        {openSection === 'template' && (
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-6 animate-fade-in-down">
             <div className="flex items-center justify-between mb-4 p-3 bg-pink-50 dark:bg-pink-900/20 text-pink-800 dark:text-pink-300 rounded-lg border border-pink-200 dark:border-pink-800">
                <div className="flex items-center gap-2">
                    <Printer size={20} />
                    <span className="font-bold text-sm">Este é o modelo final (layout) para o documento oficial da equipe.</span>
                </div>
             </div>

             <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-6 rounded-lg font-mono text-xs md:text-sm text-slate-700 dark:text-slate-300 shadow-inner overflow-x-auto">
                <div className="min-w-[600px]">
                    <h3 className="text-lg font-bold border-b-2 border-slate-300 dark:border-slate-600 pb-2 mb-4 uppercase text-center">EXEMPLO DE PREENCHIMENTO COMPLETO: MATRIZ DE ANÁLISE COMPARATIVA</h3>
                    
                    <div className="grid grid-cols-12 gap-2 border-b border-slate-300 dark:border-slate-600 pb-2 mb-2 font-bold bg-slate-200 dark:bg-slate-800 p-2">
                        <div className="col-span-4">CRITÉRIO DE AVALIAÇÃO</div>
                        <div className="col-span-4 text-center">PROPOSTA A (Ex: E-Waste)</div>
                        <div className="col-span-4 text-center">PROPOSTA B (Ex: Portfólio)</div>
                    </div>

                    {CRITERIA.map((crit, idx) => (
                        <div key={idx} className="mb-6 border-b border-slate-200 dark:border-slate-700 pb-4 last:border-0">
                            <div className="font-bold text-slate-900 dark:text-white mb-2">{idx + 1}. {crit}</div>
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-6 bg-white dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700">
                                    <p className="italic text-slate-500 mb-2">"Análise técnica da proposta A..."</p>
                                    <div className="space-y-1 text-[10px] uppercase font-bold text-slate-400">
                                        <div className="flex justify-between"><span>Membro 1:</span> <span className="text-slate-800 dark:text-white">[ 4 ]</span></div>
                                        <div className="flex justify-between"><span>Membro 2:</span> <span className="text-slate-800 dark:text-white">[ 3 ]</span></div>
                                    </div>
                                </div>
                                <div className="col-span-6 bg-white dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700">
                                    <p className="italic text-slate-500 mb-2">"Análise técnica da proposta B..."</p>
                                    <div className="space-y-1 text-[10px] uppercase font-bold text-slate-400">
                                        <div className="flex justify-between"><span>Membro 1:</span> <span className="text-slate-800 dark:text-white">[ 5 ]</span></div>
                                        <div className="flex justify-between"><span>Membro 2:</span> <span className="text-slate-800 dark:text-white">[ 5 ]</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="mt-4 p-3 bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700 rounded text-center">
                        <h4 className="font-bold text-emerald-800 dark:text-emerald-300">RESULTADO FINAL</h4>
                        <div className="grid grid-cols-2 mt-2 gap-4">
                            <div>
                                <div className="text-xs uppercase">Proposta A</div>
                                <div className="text-xl font-black">16.5 / 20</div>
                            </div>
                            <div>
                                <div className="text-xs uppercase">Proposta B (Vencedora)</div>
                                <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">19.2 / 20</div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default GuidePanel;
